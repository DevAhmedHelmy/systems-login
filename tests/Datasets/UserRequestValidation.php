<?php

dataset('user request validation', function () {
    return [
        'name Is Required' => [
            [
                'username' => 'test',
                'email' => 'test@health-links.me',
                'password' => 'SN^Jsj42KB%1',
                'password_confirmation' => 'SN^Jsj42KB%1',
                'clients' => [1, 2]

            ]
        ],
        'username Is Required' => [
            [
                'name' => 'test',
                'email' => 'test@health-links.me',
                'password' => 'SN^Jsj42KB%1',
                'password_confirmation' => 'SN^Jsj42KB%1',
                'clients' => [1, 2]

            ]
        ],
        'Email Is Required' => [
            [
                'name' => 'test',
                'username' => 'test',
                'password' => 'SN^Jsj42KB%1',
                'password_confirmation' => 'SN^Jsj42KB%1',
                'clients' => [1, 2]


            ]
        ],
        'password Is Required' => [
            [
                'name' => 'test',
                'username' => 'test',
                'email' => 'test@health-links.me',

            ],
        ],
        'clients Is Required' => [
            [
                'name' => 'test',
                'username' => 'test',
                'email' => 'test@health-links.me',
                'password' => 'SN^Jsj42KB%1',
                'password_confirmation' => 'SN^Jsj42KB%1',
            ]
        ],
        'The email must be a Health Links email.' => [
            [
                'name' => 'test',
                'username' => 'test',
                'email' => 'test@example.com',
                'password' => 'SN^Jsj42KB%1',
                'password_confirmation' => 'SN^Jsj42KB%1',
                'clients' => [1, 2]
            ]
        ],
        'The clients must be an array.' => [
            [
                'name' => 'test',
                'username' => 'test',
                'email' => 'test@health-links.me',
                'password' => 'SN^Jsj42KB%1',
                'password_confirmation' => 'SN^Jsj42KB%1',
                'clients' => 1
            ]
        ],
        'The password confirmation does not match.' => [
            [
                'name' => 'test',
                'username' => 'test',
                'email' => 'test@health-links.me',
                'password' => 'password',
                'password_confirmation' => 'test',
                'clients' => [1]
            ]
        ],
        'The clients field is required.' => [
            [
                'name' => 'test',
                'username' => 'test',
                'email' => 'test@health-links.me',
                'password' => 'SN^Jsj42KB%1',
                'password_confirmation' => 'SN^Jsj42KB%1',
                'clients' => []
            ]
        ]

    ];
});
