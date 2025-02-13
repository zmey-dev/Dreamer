<?php

namespace App\Exceptions;

use Throwable;
use App\Traits\HttpResponses; // KEY : SANCTUM
use Illuminate\Auth\AuthenticationException; 
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{

    use HttpResponses; // KEY : SANCTUM
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {   
        // KEY : SANCTUM starts
        $this->renderable(function (AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return $this->error([],"Unauthenticated.",401);              
            }
        });
        // KEY : SANCTUM ends

        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
