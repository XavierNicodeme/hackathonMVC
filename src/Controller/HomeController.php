<?php

/**
 * Created by PhpStorm.
 * User: aurelwcs
 * Date: 08/04/19
 * Time: 18:40
 */

namespace App\Controller;

class HomeController extends AbstractController
{
    /**
     * Display home page
     *
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function index()
    {
        return $this->twig->render('Home/index.html.twig');
    }

    public function win()
    {
        $result = 0;
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($_POST['name'] === 'vador') {
                $result = 1;
            } else {
                $result = 2;
            }
        }
        return $this->twig->render('Home/success.html.twig', [
            'result' => $result,
        ]);
    }
}
