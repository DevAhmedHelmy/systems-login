<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TwoFAController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

require __DIR__ . '/auth.php';
Route::get('/', function () {
    return redirect('/login');
});
Route::view('403', 'errors.403')->name('errors.403');

Route::middleware(['auth', 'ManageRedirect'])->group(function () {
    Route::get('/clients',[ClientController::class,'index'])->name('clients.index');
    Route::get('clients/data',[ClientController::class,'getClients'])->name('clients.data');
    Route::middleware(['is_admin'])->group(function () {
        Route::post('users/{user}/toggle_active', [UserController::class, 'toggleActive'])->name('clients.toggleActive');
        Route::get('users/data',[UserController::class,'getUsers'])->name('users.data');
        Route::get('/users',[UserController::class,'index'])->name('users.index');
        Route::get('/users/{user}',[UserController::class,'show'])->name('users.show');
        Route::post('clients/{client}/toggle_active', [ClientController::class, 'toggleActive'])->name('clients.toggleActive');
        Route::resource('clients', ClientController::class)->except(['index']);

    });
});

Route::get('2fa/{id}', [TwoFAController::class, 'index'])->name('2fa.index')->middleware(['2fa']);
Route::post('2fa', [TwoFAController::class, 'store'])->name('2fa.post');
Route::get('2fa/reset/{id}', [TwoFAController::class, 'resend'])->name('2fa.resend');


