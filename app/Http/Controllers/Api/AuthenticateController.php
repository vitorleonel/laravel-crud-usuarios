<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Authenticate\AuthenticateRequest;
use App\Http\Controllers\Controller;

use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\ValidationException;

class AuthenticateController extends Controller
{
	use ThrottlesLogins;

	/**
	 * Maximum number of attempts to allow.
	 *
	 * @var int
	 */
	protected $maxAttempts = 3;

	/**
	 * Number of minutes to throttle for.
	 *
	 * @var int
	 */
	protected $decayMinutes = 1;

	/**
	 * Process the login request.
	 *
	 * @param \App\Http\Requests\Api\Authenticate\AuthenticateRequest $request
	 */
	public function handler(AuthenticateRequest $request)
	{
		if($this->hasTooManyLoginAttempts($request)) {
            return $this->sendLockoutResponse($request);
		}

		$credentials = $request->only('email', 'password');

		if ($token = auth()->attempt($credentials)) {
            return $this->respondWithToken($token);
		}

		$this->incrementLoginAttempts($request);

		return response()->json([
			'message' => 'Incorret user or password.'
		], 401);
	}

	/**
     * Redirect the user after determining they are locked out.
     *
     * @param  \App\Http\Requests\Api\Authenticate\AuthenticateRequest  $request
     * @return void
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function sendLockoutResponse(AuthenticateRequest $request)
    {
        $seconds = $this->limiter()->availableIn(
            $this->throttleKey($request)
        );

        throw ValidationException::withMessages([
            'email' => [Lang::get('auth.throttle', ['seconds' => $seconds])],
        ])->status(429);
	}

	/**
     * Get the throttle key for the given request.
     *
     * @param  \App\Http\Requests\Api\Authenticate\AuthenticateRequest  $request
     * @return string
     */
    protected function throttleKey(AuthenticateRequest $request)
    {
        return Str::lower($request->input('email')) . '|' . $request->ip();
	}

	/**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
