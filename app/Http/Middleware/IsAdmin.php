<?php

namespace App\Http\Middleware;

use Closure;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		$payload = auth()->payload();

		if(! $payload['is_admin']) {
			return response()->json([
				'message' => 'Unauthorized'
			], 401);
		}

        return $next($request);
    }
}
