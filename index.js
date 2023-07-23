var ball_x, ball_y, ball_dx, ball_dy, ball_r;
var paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
var brickrows = 5, brickcolumns = 5, brickwidth = 70, brickheight = 20, brickpadding = 10, brickoffsettop = 10, brickoffsetleft = 5;
var score = 0, lives = 3, textboxwidth = 50, textboxheight = 20, textboxoffsetbottom = 10, textboxoffsetleft = 10;
var bricks = [];

for (var c = 0; c < brickcolumns; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickrows; r++) {
        bricks[c][r] = { x: 0, y: 0, hidden: 0, color: "" };
    }
}

function ballhitstop(c, r) {
    return (ball_x >= bricks[c][r].x - brickpadding) && (ball_x <= bricks[c][r].x + brickwidth + brickpadding) && (ball_y + ball_r >= bricks[c][r].y - brickpadding) && (ball_y + ball_r < bricks[c][r].y + brickheight + brickpadding);
}
function ballhitsbottom(c, r) {
    return (ball_x >= bricks[c][r].x - brickpadding) && (ball_x <= bricks[c][r].x + brickwidth + brickpadding) && (ball_y + ball_r > bricks[c][r].y - brickpadding) && (ball_y + ball_r <= bricks[c][r].y + brickheight + brickpadding);
}

function ballhitsbrickvert(c, r) {
    return (ballhitstop(c, r) || ballhitsbottom(c, r));
}

function createbricks() {
    for (var c = 0; c < brickcolumns; c++) {
        for (var r = 0; r < brickrows; r++) {
            if (bricks[c][r].hidden != 1) {
                const brickX = c * (brickpadding + brickwidth) + brickoffsetleft;
                const brickY = r * (brickpadding + brickheight) + brickoffsettop + textboxoffsetbottom;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                fill("black");
                rect(bricks[c][r].x, bricks[c][r].y, brickwidth, brickheight);
            }
        }
    }
}

function setup() {
    createCanvas(400, 400);
    ball_x = 2 * width / 5;
    ball_y = 2 * height / 5;
    ball_r = (10 / 2);
    ball_dx = 1;
    ball_dy = 3;

    paddle_width = 90;
    paddle_height = 15;
    paddle_x = (width / 2) - (paddle_width / 2);
    paddle_y = height - 20;
    paddle_dx = 3;
    fill("black");
}



function draw() {
    if (lives > 0 && score < 124) {
        clear();
        fill("black");
        if (bricks[0][1].hidden != 1) {
            bricks[0][1].hidden = 5; fill("black");
        }
        if (bricks[2][2].hidden != 1) {
            bricks[2][2].hidden = 3; fill("black");
        }
        if (bricks[1][2].hidden != 1) {
            bricks[1][2].hidden = 4; fill("black");
        }
        if (bricks[3][0].hidden != 1) {
            bricks[3][0].hidden = 2; fill("black");
        }
        if (bricks[4][3].hidden != 1) {
            bricks[4][3].hidden = 4; fill("black");
        }


        text('Score:', 0, 0, textboxwidth, textboxheight);
        text(score, textboxwidth + textboxoffsetleft, 0, textboxwidth, textboxheight);
        text('Lives', width - 3 * textboxwidth + textboxoffsetleft, 0, textboxwidth, textboxheight);
        text(lives, width - textboxwidth, 0, textboxwidth, textboxheight);
        circle(ball_x, ball_y, ball_r * 2)
        rect(paddle_x, paddle_y, paddle_width, paddle_height)
        createbricks();


        ball_x = ball_x + ball_dx;
        ball_y = ball_y + ball_dy;


        if (ball_x >= width - ball_r || ball_x <= ball_r) {
            ball_dx = -1 * ball_dx;
        }
        if (ball_y <= ball_r) {
            ball_dy = -1 * ball_dy;
        }

        if (ball_y + ball_r >= width) {
            ball_x = 2 * width / 5;
            ball_y = 2 * width / 5;
            ball_dx = 1;
            ball_dy = 3;
            lives -= 1;
        }

        if ((ball_x >= paddle_x) && (ball_x <= paddle_x + paddle_width) && (ball_y + ball_r >= paddle_y)) {
            ball_dy = -1 * ball_dy;
        }

        for (var c = 0; c < brickcolumns; c++) {
            for (var r = 0; r < brickrows; r++) {
                if (ballhitsbrickvert(c, r)) {
                    if (bricks[c][r].hidden == 0) {
                        bricks[c][r].hidden = 1;
                        score += 1;
                        ball_dy = -ball_dy;
                    }
                    if (bricks[c][r].hidden == 2) {
                        bricks[c][r].hidden = 1;
                        score += 1;
                        ball_dy = -1 * ball_dy / 2;
                    }
                    if (bricks[c][r].hidden == 3) {
                        bricks[c][r].hidden = 1;
                        score += 1;
                        ball_dy = -2 * ball_dy;
                        ball_dx = 2 * ball_dx;
                        lives += 1;
                    }
                    if (bricks[c][r].hidden == 4) {
                        bricks[c][r].hidden = 1;
                        score += 1;
                        ball_dy = -ball_dy;
                        ball_r = 2 * ball_r;
                    }
                    if (bricks[c][r].hidden == 5) {
                        bricks[c][r].hidden = 1;
                        score += 100;
                        ball_dy = -ball_dy;
                    }
                }
            }
        }
    }

    if (lives == 0) {
        fill("grey");
        rect(width / 8, width / 4, 300, 200);
        fill("white")
        text("Lives Over!", width / 4, width / 2 - textboxheight, textboxwidth, textboxheight);
        text("Your Score is:");
        text(score);
    }

    if (keyIsDown(LEFT_ARROW)) {
        paddle_x = max(paddle_x - paddle_dx, 0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        paddle_x = min(paddle_x + paddle_dx, width - paddle_width);
    } else {
        text('Score:', 0, 0, textboxwidth, textboxheight);
        text(score, textboxwidth + textboxoffsetleft, 0, textboxwidth, textboxheight);
        text('Lives', width - 3 * textboxwidth + textboxoffsetleft, 0, textboxwidth, textboxheight);
        text(lives, width - textboxwidth, 0, textboxwidth, textboxheight);
    }
}