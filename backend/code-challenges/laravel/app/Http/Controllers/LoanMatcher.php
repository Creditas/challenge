<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoanMatcher extends Controller
{
    public function index()
    {
        return view('loanmatcher.index');
    }
}
