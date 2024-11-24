<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('config.php');

function processResponse($response) {
    // Remove excessive newlines and spaces
    $response = preg_replace('/\n\s*\n\s*\n/', "\n\n", $response);
    $response = preg_replace('/\.{4,}/', '...', $response);
    
    // Ensure consistent spacing for day formats
    $response = preg_replace('/Day\s*(\d+)\s*:\s*/', 'Day $1: ', $response);
    
    // Trim excessive whitespace while preserving paragraph structure
    $response = trim(preg_replace('/\s{2,}/', ' ', $response));
    
    return $response;
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Method not allowed');
    }

    $input = file_get_contents('php://input');
    if (!$input) {
        throw new Exception('No input received');
    }

    $data = json_decode($input, true);
    if (!$data) {
        throw new Exception('Invalid JSON data: ' . json_last_error_msg());
    }

    $messages = isset($data['messages']) ? $data['messages'] : [];
    if (empty($messages)) {
        throw new Exception('No messages provided');
    }

    // Build conversation history
    $conversation = "You are QuitEasy AI, a helpful assistant dedicated to helping people quit smoking. Be supportive, understanding, and provide practical advice. Remember previous context in the conversation.\n\nConversation history:\n";
    
    foreach ($messages as $message) {
        if ($message['role'] === 'system') continue;
        $role = $message['role'] === 'user' ? 'User' : 'Assistant';
        $conversation .= "\n$role: " . $message['content'];
    }
    
    $conversation .= "\n\nAssistant:";

    $api_key = getGeminiKey();
    if (!$api_key) {
        throw new Exception('API key not found');
    }

    // Prepare request for Gemini API
    $request_data = [
        'contents' => [
            [
                'parts' => [
                    [
                        'text' => $conversation
                    ]
                ]
            ]
        ],
        'generationConfig' => [
            'temperature' => 0.7,
            'topK' => 40,
            'topP' => 0.95,
            'maxOutputTokens' => 1024,
        ],
        'safetySettings' => [
            [
                'category' => 'HARM_CATEGORY_HARASSMENT',
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
            ],
            [
                'category' => 'HARM_CATEGORY_HATE_SPEECH',
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
            ],
            [
                'category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
            ],
            [
                'category' => 'HARM_CATEGORY_DANGEROUS_CONTENT',
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
            ]
        ]
    ];

    $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' . $api_key;
    
    $ch = curl_init($url);
    if (!$ch) {
        throw new Exception('Failed to initialize CURL');
    }

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($request_data),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json'
        ]
    ]);

    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
        throw new Exception('CURL error: ' . curl_error($ch));
    }

    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code !== 200) {
        throw new Exception('Gemini API returned error code: ' . $http_code . ' Response: ' . $response);
    }

    $response_data = json_decode($response, true);
    if (!$response_data) {
        throw new Exception('Failed to decode API response: ' . json_last_error_msg());
    }

    // Format response to match the expected structure
    $response_text = $response_data['candidates'][0]['content']['parts'][0]['text'];
    $processedResponse = processResponse($response_text);

    echo json_encode(['response' => $processedResponse]);

} catch (Exception $e) {
    error_log('Error in server.php: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
