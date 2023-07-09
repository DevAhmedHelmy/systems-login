<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    public function test_admin_can_access_users_page()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $response = $this->actingAs($user)->get('/users');
        $response->assertStatus(200);
    }


    public function test_admin_can_access_show_user_details()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $response = $this->actingAs($user)->get('/users/' . $user->id);
        $response->assertStatus(200);
    }

    public function test_admin_can_list_all_user()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $users = User::factory(10)->create();
        $response = $this->actingAs($user)->get('/users/data');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'draw',
            'recordsTotal',
            'recordsFiltered',
            'data',

        ]);
    }
}
