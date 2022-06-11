let game = {
    turno: "X",
    winner: 0,
    moves: 0,
    tablero: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
};

const oSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="92" height="92" viewBox="0 0 92 92"> <defs> <style> .cls-1-o { clip-path: url(#clip-O); } .cls-2-o { fill: #f89b08; } .cls-3-o { fill: #f76206; } </style> <clipPath id="clip-O"> <rect width="92" height="92"/> </clipPath> </defs> <g id="O" class="cls-1-o"> <g id="Grupo_634" data-name="Grupo 634" transform="translate(-248 -345)"> <g id="Layer_2" data-name="Layer 2" transform="translate(249 351)"> <g id="ring_shape_2_copy_5" data-name="ring_shape_2 copy 5"> <path id="Trazado_1" data-name="Trazado 1" class="cls-2-o" d="M41.912,0A41.912,41.912,0,1,0,83.824,41.912,41.912,41.912,0,0,0,41.912,0ZM61.334,41.912A19.422,19.422,0,1,1,41.912,22.491,19.422,19.422,0,0,1,61.334,41.912Z"/> </g> </g> <g id="Layer_2-2" data-name="Layer 2" transform="translate(255 346)"> <g id="ring_shape_2_copy_5-2" data-name="ring_shape_2 copy 5"> <path id="Trazado_1-2" data-name="Trazado 1" class="cls-3-o" d="M41.912,0A41.912,41.912,0,1,0,83.824,41.912,41.912,41.912,0,0,0,41.912,0ZM61.334,41.912A19.422,19.422,0,1,1,41.912,22.491,19.422,19.422,0,0,1,61.334,41.912Z"/> </g> </g> </g> </g> </svg>';
const xSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="92" height="92" viewBox="0 0 92 92"> <defs> <style> .cls-1-x { clip-path: url(#clip-x); } .cls-2-x { fill: #f876f9; } .cls-3-x { fill: #f808f8; } </style> <clipPath id="clip-x"> <rect width="92" height="92"/> </clipPath> </defs> <g id="x" class="cls-1-x"> <g id="Grupo_635" data-name="Grupo 635" transform="translate(-137.511 -345.504)"> <g id="Layer_1_1_" transform="translate(138.508 353.518)"> <g id="Grupo_3" data-name="Grupo 3" transform="translate(0.003 -0.018)"> <g id="Grupo_1" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1" data-name="Rectángulo 1" class="cls-2-x" width="90.962" height="27.561" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 64.332)"/> </g> <g id="Grupo_2" data-name="Grupo 2" transform="translate(0 0.019)"> <rect id="Rectángulo_2" data-name="Rectángulo 2" class="cls-2-x" width="27.564" height="90.95" transform="translate(0 19.487) rotate(-45)"/> </g> </g> </g> <g id="Layer_1_1_2" data-name="Layer_1_1_" transform="translate(145.508 346.518)"> <g id="Grupo_3-2" data-name="Grupo 3" transform="translate(0.003 -0.018)"> <g id="Grupo_1-2" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1-2" data-name="Rectángulo 1" class="cls-3-x" width="90.962" height="27.561" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 64.332)"/> </g> <g id="Grupo_2-2" data-name="Grupo 2" transform="translate(0 0.019)"> <rect id="Rectángulo_2-2" data-name="Rectángulo 2" class="cls-3-x" width="27.564" height="90.95" transform="translate(0 19.487) rotate(-45)"/> </g> </g> </g> </g> </g> </svg>';

const xWin = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="306.9" height="306.9" viewBox="0 0 306.9 306.9"> <defs> <style> .cls-1 { clip-path: url(#clip-x-win); } .cls-2 { fill: #f876f9; } .cls-3 { fill: #f808f8; } .cls-4 { fill: #383a48; } .cls-5 { fill: #f3f6e6; } </style> <clipPath id="clip-x-win"> <rect width="306.9" height="306.9"/> </clipPath> </defs> <g id="x-win" class="cls-1"> <circle id="Elipse_199" data-name="Elipse 199" class="cls-2" cx="127.626" cy="127.626" r="127.626" transform="translate(10 41)"/> <g id="Grupo_628" data-name="Grupo 628" transform="translate(-459 -1107.003)"> <g id="abstract-703" transform="translate(484.457 1129.457)"> <g id="Grupo_611" data-name="Grupo 611"> <circle id="Elipse_197" data-name="Elipse 197" class="cls-3" cx="127.626" cy="127.626" r="127.626" transform="translate(4.545 4.545)"/> <path id="Trazado_2" data-name="Trazado 2" class="cls-4" d="M132.172,264.343A132.172,132.172,0,1,1,264.343,132.172,132.291,132.291,0,0,1,132.172,264.343Zm0-255.253A123.081,123.081,0,1,0,255.253,132.172,123.174,123.174,0,0,0,132.172,9.09Z"/> </g> <g id="Grupo_612" data-name="Grupo 612" transform="translate(86.656 140.444)"> <path id="Trazado_3" data-name="Trazado 3" class="cls-4" d="M100.3,159.5c7.09,26.362,22.816,37.179,41.088,37.179s33.906-10.817,41.088-37.179Z" transform="translate(-95.781 -154.955)"/> <path id="Trazado_4" data-name="Trazado 4" class="cls-4" d="M140.935,200.769c-22.271,0-38.452-14.363-45.451-40.542a4.329,4.329,0,0,1,.818-3.909,4.746,4.746,0,0,1,3.636-1.818h82.175a4.478,4.478,0,0,1,3.636,1.818,4.611,4.611,0,0,1,.818,3.909C179.3,186.407,163.116,200.769,140.935,200.769ZM106.029,163.59c6.545,18.453,18.453,28.089,34.906,28.089,16.362,0,28.361-9.727,34.906-28.089Z" transform="translate(-95.329 -154.5)"/> </g> <g id="Grupo_613" data-name="Grupo 613" transform="translate(86.63 140.353)"> <path id="Trazado_5" data-name="Trazado 5" class="cls-5" d="M110.845,181.944h60.9c7.545-8.817,10.636-22.544,10.636-22.544H100.3C100.3,159.491,104.118,174.217,110.845,181.944Z" transform="translate(-95.755 -154.855)"/> <path id="Trazado_6" data-name="Trazado 6" class="cls-4" d="M171.294,186.034h-60.9a4.7,4.7,0,0,1-3.454-1.545C99.391,175.853,95.3,160.127,95.3,158.945a4.5,4.5,0,0,1,4.545-4.545H181.93a4.479,4.479,0,0,1,3.545,1.727,4.777,4.777,0,0,1,.909,3.818c-.182.636-3.454,14.908-11.635,24.544A4.415,4.415,0,0,1,171.294,186.034Zm-58.723-9.09h56.541a51.641,51.641,0,0,0,6.727-13.454H106.026A55.69,55.69,0,0,0,112.571,176.944Z" transform="translate(-95.3 -154.4)"/> </g> <g id="Grupo_614" data-name="Grupo 614" transform="translate(155.624 101.447)"> <path id="Trazado_7" data-name="Trazado 7" class="cls-3" d="M176.2,129.781a13.181,13.181,0,1,1,26.362,0" transform="translate(-171.655 -112.055)"/> <path id="Trazado_8" data-name="Trazado 8" class="cls-4" d="M202.107,133.871a4.5,4.5,0,0,1-4.545-4.545,8.636,8.636,0,0,0-17.271,0,4.545,4.545,0,1,1-9.09,0,17.726,17.726,0,1,1,35.452,0A4.5,4.5,0,0,1,202.107,133.871Z" transform="translate(-171.2 -111.6)"/> </g> <g id="Grupo_615" data-name="Grupo 615" transform="translate(73.358 101.447)"> <path id="Trazado_9" data-name="Trazado 9" class="cls-3" d="M112.062,129.781a13.181,13.181,0,1,0-26.362,0" transform="translate(-81.155 -112.055)"/> <path id="Trazado_10" data-name="Trazado 10" class="cls-4" d="M111.607,133.871a4.5,4.5,0,0,1-4.545-4.545,8.636,8.636,0,0,0-17.271,0,4.545,4.545,0,1,1-9.09,0,17.726,17.726,0,0,1,35.452,0A4.5,4.5,0,0,1,111.607,133.871Z" transform="translate(-80.7 -111.6)"/> </g> </g> <g id="Grupo_624" data-name="Grupo 624" transform="translate(323.489 760.496)"> <g id="Layer_1_1_" transform="translate(138.511 353.504)"> <g id="Grupo_3" data-name="Grupo 3" transform="translate(0 0)"> <g id="Grupo_1" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1" data-name="Rectángulo 1" class="cls-2" width="41.136" height="12.462" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 29.094)"/> </g> <g id="Grupo_2" data-name="Grupo 2" transform="translate(0 0.013)"> <rect id="Rectángulo_2" data-name="Rectángulo 2" class="cls-2" width="12.463" height="41.124" transform="translate(0 8.813) rotate(-45)"/> </g> </g> </g> <g id="Layer_1_1_2" data-name="Layer_1_1_" transform="translate(145.511 346.504)"> <g id="Grupo_3-2" data-name="Grupo 3" transform="translate(0 0)"> <g id="Grupo_1-2" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1-2" data-name="Rectángulo 1" class="cls-3" width="41.136" height="12.462" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 29.094)"/> </g> <g id="Grupo_2-2" data-name="Grupo 2" transform="translate(0 0.013)"> <rect id="Rectángulo_2-2" data-name="Rectángulo 2" class="cls-3" width="12.463" height="41.124" transform="translate(0 8.813) rotate(-45)"/> </g> </g> </g> </g> <g id="Grupo_625" data-name="Grupo 625" transform="translate(578.489 1022.496)"> <g id="Layer_1_1_3" data-name="Layer_1_1_" transform="translate(138.511 353.504)"> <g id="Grupo_3-3" data-name="Grupo 3" transform="translate(0 0)"> <g id="Grupo_1-3" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1-3" data-name="Rectángulo 1" class="cls-2" width="41.136" height="12.462" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 29.094)"/> </g> <g id="Grupo_2-3" data-name="Grupo 2" transform="translate(0 0.013)"> <rect id="Rectángulo_2-3" data-name="Rectángulo 2" class="cls-2" width="12.463" height="41.124" transform="translate(0 8.813) rotate(-45)"/> </g> </g> </g> <g id="Layer_1_1_4" data-name="Layer_1_1_" transform="translate(145.511 346.504)"> <g id="Grupo_3-4" data-name="Grupo 3" transform="translate(0 0)"> <g id="Grupo_1-4" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1-4" data-name="Rectángulo 1" class="cls-3" width="41.136" height="12.462" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 29.094)"/> </g> <g id="Grupo_2-4" data-name="Grupo 2" transform="translate(0 0.013)"> <rect id="Rectángulo_2-4" data-name="Rectángulo 2" class="cls-3" width="12.463" height="41.124" transform="translate(0 8.813) rotate(-45)"/> </g> </g> </g> </g> <g id="Grupo_626" data-name="Grupo 626" transform="translate(578.489 760.496)"> <g id="Layer_1_1_5" data-name="Layer_1_1_" transform="translate(138.511 353.504)"> <g id="Grupo_3-5" data-name="Grupo 3" transform="translate(0 0)"> <g id="Grupo_1-5" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1-5" data-name="Rectángulo 1" class="cls-2" width="41.136" height="12.462" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 29.094)"/> </g> <g id="Grupo_2-5" data-name="Grupo 2" transform="translate(0 0.013)"> <rect id="Rectángulo_2-5" data-name="Rectángulo 2" class="cls-2" width="12.463" height="41.124" transform="translate(0 8.813) rotate(-45)"/> </g> </g> </g> <g id="Layer_1_1_6" data-name="Layer_1_1_" transform="translate(145.511 346.504)"> <g id="Grupo_3-6" data-name="Grupo 3" transform="translate(0 0)"> <g id="Grupo_1-6" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1-6" data-name="Rectángulo 1" class="cls-3" width="41.136" height="12.462" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 29.094)"/> </g> <g id="Grupo_2-6" data-name="Grupo 2" transform="translate(0 0.013)"> <rect id="Rectángulo_2-6" data-name="Rectángulo 2" class="cls-3" width="12.463" height="41.124" transform="translate(0 8.813) rotate(-45)"/> </g> </g> </g> </g> <g id="Grupo_627" data-name="Grupo 627" transform="translate(323.489 1022.496)"> <g id="Layer_1_1_7" data-name="Layer_1_1_" transform="translate(138.511 353.504)"> <g id="Grupo_3-7" data-name="Grupo 3" transform="translate(0 0)"> <g id="Grupo_1-7" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1-7" data-name="Rectángulo 1" class="cls-2" width="41.136" height="12.462" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 29.094)"/> </g> <g id="Grupo_2-7" data-name="Grupo 2" transform="translate(0 0.013)"> <rect id="Rectángulo_2-7" data-name="Rectángulo 2" class="cls-2" width="12.463" height="41.124" transform="translate(0 8.813) rotate(-45)"/> </g> </g> </g> <g id="Layer_1_1_8" data-name="Layer_1_1_" transform="translate(145.511 346.504)"> <g id="Grupo_3-8" data-name="Grupo 3" transform="translate(0 0)"> <g id="Grupo_1-8" data-name="Grupo 1" transform="translate(0.01 0)"> <rect id="Rectángulo_1-8" data-name="Rectángulo 1" class="cls-3" width="41.136" height="12.462" transform="matrix(0.707, -0.707, 0.707, 0.707, 0, 29.094)"/> </g> <g id="Grupo_2-8" data-name="Grupo 2" transform="translate(0 0.013)"> <rect id="Rectángulo_2-8" data-name="Rectángulo 2" class="cls-3" width="12.463" height="41.124" transform="translate(0 8.813) rotate(-45)"/> </g> </g> </g> </g> </g> </g></svg>';
const oWin = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="306.9" height="306.9" viewBox="0 0 306.9 306.9"> <defs> <style> .cls-1 { clip-path: url(#clip-o-win); } .cls-2 { fill: #f89b08; } .cls-3 { fill: #f76206; } .cls-4 { fill: #383a48; } .cls-5 { fill: #f3f6e6; } </style> <clipPath id="clip-o-win"> <rect width="306.9" height="306.9"/> </clipPath> </defs> <g id="o-win" class="cls-1"> <circle id="Elipse_199" data-name="Elipse 199" class="cls-2" cx="127.626" cy="127.626" r="127.626" transform="translate(12 40)"/> <g id="Grupo_633" data-name="Grupo 633" transform="translate(-810.824 -1059)"> <g id="abstract-703" transform="translate(836.457 1080.457)"> <g id="Grupo_611" data-name="Grupo 611"> <circle id="Elipse_197" data-name="Elipse 197" class="cls-3" cx="127.626" cy="127.626" r="127.626" transform="translate(4.545 4.545)"/> <path id="Trazado_2" data-name="Trazado 2" class="cls-4" d="M132.172,264.343A132.172,132.172,0,1,1,264.343,132.172,132.291,132.291,0,0,1,132.172,264.343Zm0-255.253A123.081,123.081,0,1,0,255.253,132.172,123.174,123.174,0,0,0,132.172,9.09Z"/> </g> <g id="Grupo_612" data-name="Grupo 612" transform="translate(86.656 140.444)"> <path id="Trazado_3" data-name="Trazado 3" class="cls-4" d="M100.3,159.5c7.09,26.362,22.816,37.179,41.088,37.179s33.906-10.817,41.088-37.179Z" transform="translate(-95.781 -154.955)"/> <path id="Trazado_4" data-name="Trazado 4" class="cls-4" d="M140.935,200.769c-22.271,0-38.452-14.363-45.451-40.542a4.329,4.329,0,0,1,.818-3.909,4.746,4.746,0,0,1,3.636-1.818h82.175a4.478,4.478,0,0,1,3.636,1.818,4.611,4.611,0,0,1,.818,3.909C179.3,186.407,163.116,200.769,140.935,200.769ZM106.029,163.59c6.545,18.453,18.453,28.089,34.906,28.089,16.362,0,28.361-9.727,34.906-28.089Z" transform="translate(-95.329 -154.5)"/> </g> <g id="Grupo_613" data-name="Grupo 613" transform="translate(86.63 140.353)"> <path id="Trazado_5" data-name="Trazado 5" class="cls-5" d="M110.845,181.944h60.9c7.545-8.817,10.636-22.544,10.636-22.544H100.3C100.3,159.491,104.118,174.217,110.845,181.944Z" transform="translate(-95.755 -154.855)"/> <path id="Trazado_6" data-name="Trazado 6" class="cls-4" d="M171.294,186.034h-60.9a4.7,4.7,0,0,1-3.454-1.545C99.391,175.853,95.3,160.127,95.3,158.945a4.5,4.5,0,0,1,4.545-4.545H181.93a4.479,4.479,0,0,1,3.545,1.727,4.777,4.777,0,0,1,.909,3.818c-.182.636-3.454,14.908-11.635,24.544A4.415,4.415,0,0,1,171.294,186.034Zm-58.723-9.09h56.541a51.641,51.641,0,0,0,6.727-13.454H106.026A55.69,55.69,0,0,0,112.571,176.944Z" transform="translate(-95.3 -154.4)"/> </g> <g id="Grupo_614" data-name="Grupo 614" transform="translate(155.624 101.447)"> <path id="Trazado_7" data-name="Trazado 7" class="cls-3" d="M176.2,129.781a13.181,13.181,0,1,1,26.362,0" transform="translate(-171.655 -112.055)"/> <path id="Trazado_8" data-name="Trazado 8" class="cls-4" d="M202.107,133.871a4.5,4.5,0,0,1-4.545-4.545,8.636,8.636,0,0,0-17.271,0,4.545,4.545,0,1,1-9.09,0,17.726,17.726,0,1,1,35.452,0A4.5,4.5,0,0,1,202.107,133.871Z" transform="translate(-171.2 -111.6)"/> </g> <g id="Grupo_615" data-name="Grupo 615" transform="translate(73.358 101.447)"> <path id="Trazado_9" data-name="Trazado 9" class="cls-3" d="M112.062,129.781a13.181,13.181,0,1,0-26.362,0" transform="translate(-81.155 -112.055)"/> <path id="Trazado_10" data-name="Trazado 10" class="cls-4" d="M111.607,133.871a4.5,4.5,0,0,1-4.545-4.545,8.636,8.636,0,0,0-17.271,0,4.545,4.545,0,1,1-9.09,0,17.726,17.726,0,0,1,35.452,0A4.5,4.5,0,0,1,111.607,133.871Z" transform="translate(-80.7 -111.6)"/> </g> </g> <g id="Grupo_629" data-name="Grupo 629" transform="translate(813.824 1321)"> <g id="Layer_2" data-name="Layer 2" transform="translate(0 2.5)"> <g id="ring_shape_2_copy_5" data-name="ring_shape_2 copy 5"> <path id="Trazado_1" data-name="Trazado 1" class="cls-2" d="M20.956,0A20.956,20.956,0,1,0,41.912,20.956,20.956,20.956,0,0,0,20.956,0Zm9.711,20.956a9.711,9.711,0,1,1-9.711-9.711,9.711,9.711,0,0,1,9.711,9.711Z"/> </g> </g> <g id="Layer_2-2" data-name="Layer 2" transform="translate(3)"> <g id="ring_shape_2_copy_5-2" data-name="ring_shape_2 copy 5"> <path id="Trazado_1-2" data-name="Trazado 1" class="cls-3" d="M20.956,0A20.956,20.956,0,1,0,41.912,20.956,20.956,20.956,0,0,0,20.956,0Zm9.711,20.956a9.711,9.711,0,1,1-9.711-9.711,9.711,9.711,0,0,1,9.711,9.711Z"/> </g> </g> </g> <g id="Grupo_630" data-name="Grupo 630" transform="translate(1068.824 1321)"> <g id="Layer_2-3" data-name="Layer 2" transform="translate(0 2.5)"> <g id="ring_shape_2_copy_5-3" data-name="ring_shape_2 copy 5"> <path id="Trazado_1-3" data-name="Trazado 1" class="cls-2" d="M20.956,0A20.956,20.956,0,1,0,41.912,20.956,20.956,20.956,0,0,0,20.956,0Zm9.711,20.956a9.711,9.711,0,1,1-9.711-9.711,9.711,9.711,0,0,1,9.711,9.711Z"/> </g> </g> <g id="Layer_2-4" data-name="Layer 2" transform="translate(3)"> <g id="ring_shape_2_copy_5-4" data-name="ring_shape_2 copy 5"> <path id="Trazado_1-4" data-name="Trazado 1" class="cls-3" d="M20.956,0A20.956,20.956,0,1,0,41.912,20.956,20.956,20.956,0,0,0,20.956,0Zm9.711,20.956a9.711,9.711,0,1,1-9.711-9.711,9.711,9.711,0,0,1,9.711,9.711Z"/> </g> </g> </g> <g id="Grupo_631" data-name="Grupo 631" transform="translate(1068.824 1060)"> <g id="Layer_2-5" data-name="Layer 2" transform="translate(0 2.5)"> <g id="ring_shape_2_copy_5-5" data-name="ring_shape_2 copy 5"> <path id="Trazado_1-5" data-name="Trazado 1" class="cls-2" d="M20.956,0A20.956,20.956,0,1,0,41.912,20.956,20.956,20.956,0,0,0,20.956,0Zm9.711,20.956a9.711,9.711,0,1,1-9.711-9.711,9.711,9.711,0,0,1,9.711,9.711Z"/> </g> </g> <g id="Layer_2-6" data-name="Layer 2" transform="translate(3)"> <g id="ring_shape_2_copy_5-6" data-name="ring_shape_2 copy 5"> <path id="Trazado_1-6" data-name="Trazado 1" class="cls-3" d="M20.956,0A20.956,20.956,0,1,0,41.912,20.956,20.956,20.956,0,0,0,20.956,0Zm9.711,20.956a9.711,9.711,0,1,1-9.711-9.711,9.711,9.711,0,0,1,9.711,9.711Z"/> </g> </g> </g> <g id="Grupo_632" data-name="Grupo 632" transform="translate(816.824 1060)"> <g id="Layer_2-7" data-name="Layer 2" transform="translate(0 2.5)"> <g id="ring_shape_2_copy_5-7" data-name="ring_shape_2 copy 5"> <path id="Trazado_1-7" data-name="Trazado 1" class="cls-2" d="M20.956,0A20.956,20.956,0,1,0,41.912,20.956,20.956,20.956,0,0,0,20.956,0Zm9.711,20.956a9.711,9.711,0,1,1-9.711-9.711,9.711,9.711,0,0,1,9.711,9.711Z"/> </g> </g> <g id="Layer_2-8" data-name="Layer 2" transform="translate(3)"> <g id="ring_shape_2_copy_5-8" data-name="ring_shape_2 copy 5"> <path id="Trazado_1-8" data-name="Trazado 1" class="cls-3" d="M20.956,0A20.956,20.956,0,1,0,41.912,20.956,20.956,20.956,0,0,0,20.956,0Zm9.711,20.956a9.711,9.711,0,1,1-9.711-9.711,9.711,9.711,0,0,1,9.711,9.711Z"/> </g> </g> </g> </g> </g></svg>';


const rellenoData = () => {
   
    document.getElementById("info").innerHTML = 'Turno de ' + game.turno;
    
    for (let r = 0; r < game.tablero.length; r++) {
        const row = document.querySelector("table tr:nth-of-type(" + (r + 1) + ")");
        for (let c = 0; c < game.tablero[r].length; c++) {
            if(game.tablero[r][c] != 0){

                row.querySelector("td:nth-of-type(" + (c + 1) + ")").innerHTML = (game.tablero[r][c] === 'X') ? xSvg : oSvg;
                
            } else {
                row.querySelector("td:nth-of-type(" + (c + 1) + ")").innerHTML = " ";
            }
        }
    }
};

function reset(){

    game = {
        turno: "X",
        winner: 0,
        moves: 0,
        tablero: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]  
    };

    rellenoData();
    document.getElementById("cartel").innerHTML = '<h1 id="ganador">Tateti</h1>';
    document.getElementById("signoExclamacion").style.display = "block";
    document.getElementById("signoReset").style.display = "none";
    
    let todasLasPosiciones = document.querySelectorAll('tr td');
    todasLasPosiciones.forEach(function(celda){ celda.innerHTML = ''; })

    document.getElementById("info").onclick = null;
}

function play(r, c) {
    console.log('play');
    if (game.tablero[r][c] === 0) {
        game.tablero[r][c] = game.turno;
        game.moves++;
        
        if(checkGanador() || game.moves === 9) {
            gameOver();
        } else {
            game.turno = game.turno === "X" ? "O" : "X";
            rellenoData();
        }
        
    }
}

function checkGanador(){
    return checkFila() || checkCol() || checkDiag();
}

function checkFila () {
    if(
    (game.tablero[0][0] === game.turno && game.tablero[0][1] === game.turno && game.tablero[0][2] === game.turno) || 
    (game.tablero[1][0] === game.turno && game.tablero[1][1] === game.turno && game.tablero[1][2] === game.turno) || 
    (game.tablero[2][0] === game.turno && game.tablero[2][1] === game.turno && game.tablero[2][2] === game.turno) ) {
        game.winner = game.turno;
    }
    return game.winner !== 0;
}

function checkCol () {
    if(
    (game.tablero[0][0] === game.turno && game.tablero[1][0] === game.turno && game.tablero[2][0] === game.turno) || 
    (game.tablero[0][1] === game.turno && game.tablero[1][1] === game.turno && game.tablero[2][1] === game.turno) || 
    (game.tablero[0][2] === game.turno && game.tablero[1][2] === game.turno && game.tablero[2][2] === game.turno) ) {
        game.winner = game.turno;
    }
    return game.winner !== 0;
}

function checkDiag () {
    if(
    (game.tablero[0][0] === game.turno && game.tablero[1][1] === game.turno && game.tablero[2][2] === game.turno) || 
    (game.tablero[0][2] === game.turno && game.tablero[1][1] === game.turno && game.tablero[2][0] === game.turno) ) {
        game.winner = game.turno;
    }
    return game.winner !== 0;
}

function gameOver(){

    rellenoData();
    document.getElementById("info").innerHTML = 'Volvé a jugar';
    document.getElementById("signoExclamacion").style.display = "none";
    document.getElementById("signoReset").style.display = "block";

    document.getElementById("info").onclick = reset;
    document.getElementById("ganador").innerHTML = (game.winner === 0 ? " Empate" : (" Ganó: " + game.winner));
    document.getElementById("cartel").style.display = "block";
    sumPoints(game.winner == "X" ? "X" : "O");
    //if(game.winner === 'X'){
        //document.querySelector("table").innerHTML = xWin;
    //}else{
        //document.querySelector("table").innerHTML = oWin;
    //}
    
};

function sumPoints(player) {
  //let thePlayer = Storage.get(player == "jug1" ? "" : "player2");//base

  let thePlayer = Storage.get(player == "X" ? "player1" : "player2"); //reconstruccion



  let actualPoints = parseInt(thePlayer.tatetiPoints);
  thePlayer.tatetiPoints = actualPoints + 10;
  thePlayer.totalPoints = thePlayer.generalaPoints + thePlayer.tatetiPoints;
  Storage.put(player == "X" ? "player1" : "player2", thePlayer);
}

window.addEventListener('DOMContentLoaded', (event) => {
    let table = document.querySelector('table');
    console.log(table);

    table.onclick = (e) => {
        e.preventDefault();
        table.classList.remove('choose');
        let todasLasPosiciones = document.querySelectorAll('tr td');

        todasLasPosiciones.forEach(function(celda){ celda.classList.add('bordes'); });
        table.onclick = null;
    }
});