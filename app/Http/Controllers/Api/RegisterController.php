<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Register\RegisterRequest;
use App\Http\Controllers\Controller;

use App\User;

class RegisterController extends Controller
{
	/**
	 * Register a user.
	 *
	 * @param StoreRequest $request
	 */
	public function handler(RegisterRequest $request)
	{
		$data = $request->only(['name', 'email', 'password']);
		$user = User::create($data);

		if(! $user) {
			return response()->json([
				'message' => 'User not created. Try again!'
			], 400);
		}

		return response()->json(null, 201);
	}
}
