<?php

dataset('client request validation', function () {

    return [
        'Name Is Required' => [
            [
                'domain' => 'test@health-links.me',
                'api_key' => 'password',
                'users' => [1, 2]
            ]
        ],
        'Domain Is Required' => [
            [
                'name' => 'test',
                'api_key' => 'password',
                'users' => [1, 2]
            ],
        ]
    ];
});
