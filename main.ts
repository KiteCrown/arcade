controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -90
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        if (face == 1) {
            controller.moveSprite(mySprite, 0, 0)
            animation.runImageAnimation(
            mySprite,
            [img`
                . 2 2 2 2 . . . 
                . 2 b b b b . . 
                . 2 b b b b . . 
                2 2 b f f f . . 
                . . b b f b . . 
                . . 2 2 2 2 . . 
                . . c c c 2 . . 
                . . c . . c . . 
                `,img`
                . . . . . . . . 
                . 2 2 2 2 . . . 
                . 2 b b b b . . 
                . 2 b b b b . . 
                2 2 b f f f . . 
                . . b b f b . . 
                . . 2 2 2 2 . . 
                . . c . . c . . 
                `,img`
                . . . . . . . . 
                . 2 2 2 2 . . . 
                . 2 b b b b . . 
                . 2 b b b b . . 
                2 2 b f f f . . 
                . . b b f b . . 
                . . 2 2 2 2 . . 
                . c . . . c . . 
                `,img`
                . . . . . . . . 
                . 2 2 2 2 . . . 
                . 2 b b b b . . 
                . 2 b b b b . . 
                2 2 b f f f . . 
                . . b b f b . . 
                . . 2 2 2 2 . . 
                . . c . . c . . 
                `],
            150,
            false
            )
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                c . . . . . . . 
                c c c c c c c . 
                c d d d d d . . 
                c c c c c . . . 
                c . . . . . . . 
                `, mySprite, 0, 0)
            music.play(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            projectile.x += 7
            timer.after(600, function () {
                sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
                controller.moveSprite(mySprite, 50, 0)
            })
        } else {
            controller.moveSprite(mySprite, 0, 0)
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . 2 2 2 2 . 
                . . b b b b 2 . 
                . . b b b b 2 . 
                . . f f f b 2 2 
                . . b f b b . . 
                . . 2 2 2 2 . . 
                . . 2 c c c . . 
                . . c . . c . . 
                `,img`
                . . . . . . . . 
                . . . 2 2 2 2 . 
                . . b b b b 2 . 
                . . b b b b 2 . 
                . . f f f b 2 2 
                . . b f b b . . 
                . . 2 2 2 2 . . 
                . . c . . c . . 
                `,img`
                . . . . . . . . 
                . . . 2 2 2 2 . 
                . . b b b b 2 . 
                . . b b b b 2 . 
                . . f f f b 2 2 
                . . b f b b . . 
                . . 2 2 2 2 . . 
                . . c . . . c . 
                `,img`
                . . . . . . . . 
                . . . 2 2 2 2 . 
                . . b b b b 2 . 
                . . b b b b 2 . 
                . . f f f b 2 2 
                . . b f b b . . 
                . . 2 2 2 2 . . 
                . . c . . c . . 
                `],
            150,
            false
            )
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . c 
                . c c c c c c c 
                . . d d d d d c 
                . . . c c c c c 
                . . . . . . . c 
                `, mySprite, 0, 0)
            music.play(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            projectile.x += -7
            timer.after(600, function () {
                sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
                controller.moveSprite(mySprite, 50, 0)
            })
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft))
    face = 0
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    statusbar.value += -5
    sprites.destroy(otherSprite, effects.halo, 500)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight))
    face = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(2, 500)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    for (let index = 0; index < 5; index++) {
        mySprite.setFlag(SpriteFlag.Invisible, true)
        pause(100)
        timer.after(100, function () {
            mySprite.setFlag(SpriteFlag.Invisible, false)
        })
        timer.after(700, function () {
            mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Text, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    scene.cameraShake(2, 500)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    for (let index = 0; index < 5; index++) {
        mySprite.setFlag(SpriteFlag.Invisible, true)
        pause(100)
        timer.after(100, function () {
            mySprite.setFlag(SpriteFlag.Invisible, false)
        })
        timer.after(700, function () {
            mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        })
    }
})
let projectile2: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
let face = 0
let move = 1
info.setLife(5)
profilelife.setMaxLife(5)
face = 0
let score = 0
let level = 1
tiles.loadMap(tiles.createSmallMap(tilemap`level2`))
mySprite = sprites.create(img`
    . 2 2 2 2 . . . 
    . 2 b b b b . . 
    . 2 b b b b . . 
    2 2 b f f f . . 
    . . b b f b . . 
    . . 2 2 2 2 . . 
    . . c c c 2 . . 
    . . c . . c . . 
    `, SpriteKind.Player)
characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
mySprite.ay = 100
controller.moveSprite(mySprite, 50, 0)
let level_count = textsprite.create("level: " + level)
level_count.setFlag(SpriteFlag.RelativeToCamera, true)
level_count.setPosition(135, 5)
let scoreUi = textsprite.create("score:" + score + "")
scoreUi.setFlag(SpriteFlag.RelativeToCamera, true)
scoreUi.setPosition(80, 5)
characterAnimations.loopFrames(
mySprite,
[img`
    . 2 2 2 2 . . . 
    . 2 b b b b . . 
    . 2 b b b b . . 
    2 2 b f f f . . 
    . . b b f b . . 
    . . 2 2 2 2 . . 
    . . c c c 2 . . 
    . . c . . c . . 
    `,img`
    . . . . . . . . 
    . 2 2 2 2 . . . 
    . 2 b b b b . . 
    . 2 b b b b . . 
    2 2 b f f f . . 
    . . b b f b . . 
    . . 2 2 2 2 . . 
    . . c . . c . . 
    `],
500,
characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . 2 2 2 2 . 
    . . b b b b 2 . 
    . . b b b b 2 . 
    . . f f f b 2 2 
    . . b f b b . . 
    . . 2 2 2 2 . . 
    . . 2 c c c . . 
    . . c . . c . . 
    `,img`
    . . . . . . . . 
    . . . 2 2 2 2 . 
    . . b b b b 2 . 
    . . b b b b 2 . 
    . . f f f b 2 2 
    . . b f b b . . 
    . . 2 2 2 2 . . 
    . . c . . c . . 
    `],
500,
characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . 2 2 2 2 . . . 
    . 2 b b b b . . 
    . 2 b b b b . . 
    2 2 b f f f . . 
    . . b b f b . . 
    . . 2 2 2 2 . . 
    . . c c c 2 . . 
    . . c . . c . . 
    `,img`
    . . . . . . . . 
    . 2 2 2 2 . . . 
    . 2 b b b b . . 
    . 2 b b b b . . 
    2 2 b f f f . . 
    . . b b f b . . 
    . . 2 2 2 2 . . 
    . . . c c . . . 
    `],
200,
characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . 2 2 2 2 . 
    . . b b b b 2 . 
    . . b b b b 2 . 
    . . f f f b 2 2 
    . . b f b b . . 
    . . 2 2 2 2 . . 
    . . 2 c c c . . 
    . . c . . c . . 
    `,img`
    . . . . . . . . 
    . . . 2 2 2 2 . 
    . . b b b b 2 . 
    . . b b b b 2 . 
    . . f f f b 2 2 
    . . b f b b . . 
    . . 2 2 2 2 . . 
    . . . c c . . . 
    `],
200,
characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft)
)
let boss1 = sprites.create(img`
    ..fff........fff
    .ffcc......fcbbc
    ffcc......fcbbc.
    fcfc......fbccc.
    fffcc.cc.fcbbcc.
    ffc3cc3ccfbcbbc.
    ffb3bc3bcfbccbc.
    .cbbbbbbcbbccc..
    .c1bbb1bbcccc...
    cbbbbbbbbbcc....
    cbcbbbcbbbbf....
    fb1fff1bbbbfc...
    fbbbbbbbbbbfcc..
    .fbbbbbbbbcf....
    ..fbbbbbbcf.....
    ...fffffff......
    ................
    ................
    ................
    ................
    ................
    `, SpriteKind.Enemy)
boss1.setPosition(20, 20)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(boss1)
game.onUpdate(function () {
    if (move == 1) {
        if (mySprite.x > boss1.x) {
            boss1.vx = 30
        } else {
            boss1.vx = -30
        }
    } else {
        boss1.setVelocity(0, 0)
    }
})
game.onUpdateInterval(5000, function () {
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, boss1, 50, 100)
    projectile2.setKind(SpriteKind.Text)
    projectile2.y += 12
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, boss1, 30, 100)
    projectile2.setKind(SpriteKind.Text)
    projectile2.y += 12
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, boss1, -50, 100)
    projectile2.setKind(SpriteKind.Text)
    projectile2.y += 12
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, boss1, -30, 100)
    projectile2.setKind(SpriteKind.Text)
    projectile2.y += 12
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, boss1, 0, 100)
    projectile2.setKind(SpriteKind.Text)
    projectile2.y += 12
})
game.onUpdateInterval(10000, function () {
    animation.runImageAnimation(
    boss1,
    [img`
        f f f . . . . . . . . f f f . . 
        c b b c f . . . . . . c c f f . 
        . c b b c f . . . . . . c c f f 
        . c c c b f . . . . . . c f c f 
        . c c b b c f . c c . c c f f f 
        . c b b c b f c c 3 c c 3 c f f 
        . c b c c b f c b 3 c b 3 b f f 
        . . c c c b b c b 1 b b b 1 c . 
        . . . c c c c b b 1 b b b 1 c . 
        . . . . c c b b b b b b b b b c 
        . . . . f b b b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b b 2 2 2 2 f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        f f f . . . . . . . . f f f . . 
        c b b c f . . . . . . c c f f . 
        . c b b c f . . . . . . c c f f 
        . c c c b f . . . . . . c f c f 
        . c c b b c f . c c . c c f f f 
        . c b b c b f c c 3 c c 3 c f f 
        . c b c c b f c b 3 c b 3 b f f 
        . . c c c b b c b 1 b b b 1 c . 
        . . . c c c c b b 1 b b b 1 c . 
        . . . . c c b b b b b b b b b c 
        . . . . f b b b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b b 2 2 2 2 f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        . . . . . . . . . . . f f f . . 
        f f f . . . . . . . . c c f f f 
        c b b c f . . . c c . c c c f f 
        . c b b b f f c c 3 c c 3 c f f 
        . c c c b b f c b 3 c b 3 c f f 
        . c c b c b f c b b b b b b c f 
        . c b b c b b c b 1 b b b 1 c c 
        . c b c c c b b b b b b b b b c 
        . . c c c c c b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f c 
        . . . c f b b b b f f f f f f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b 2 2 2 2 2 f . 
        . . . . . f c b b b 2 2 2 f . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . f f f . . 
        f f f . . . . . . . . c c f f f 
        c b b c f . . . c c . c c c f f 
        . c b b b f f c c 3 c c 3 c f f 
        . c c c b b f c b 3 c b 3 c f f 
        . c c b c b f c b b b b b b c f 
        . c b b c b b c b 1 b b b 1 c c 
        . c b c c c b b b b b b b b b c 
        . . c c c c c b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f c 
        . . . c f b b b b f f f f f f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b 2 2 2 2 2 f . 
        . . . . . f c b b b 2 2 2 f . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . f f f . . 
        f f f . . . . . . . . c c f f f 
        c b b c f . . . c c . c c c f f 
        . c b b b f f c c 3 c c 3 c f f 
        . c c c b b f c b 3 c b 3 c f f 
        . c c b c b f c b b b b b b c f 
        . c b b c b b c b 1 b b b 1 c c 
        . c b c c c b b b b b b b b b c 
        . . c c c c c b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f c 
        . . . c f b b b b f f f f f f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b 2 2 2 2 2 f . 
        . . . . . f c b b b 2 2 2 f . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c c . c c . . . 
        . . . . . . c c c 3 c c 3 f . . 
        . . . . . c c c b 3 c b 3 c f . 
        . . . . f f b b b b b b b b c f 
        . . . . f f b b b 1 b b b 1 c c 
        . . . f f f c b b b b b b b b c 
        . . . f f f f b b c 1 f f 1 b c 
        . . . b b b c c b f 1 f f 1 f f 
        . . . c c c c f b f f f f f f f 
        . . c c c b b f b f 2 2 2 2 f f 
        . . . c b b c c b 2 2 2 2 2 f . 
        . . c b b c c f f b 2 2 2 f . . 
        . c c c c c f f f f f f f . . . 
        c c c c . . . . . . . . . . . . 
        `,img`
        . f f f . . . . . . . . f f f . 
        . c b b c f . . . . . . . c f f 
        . . c b b c f . . . . . . c c f 
        . . c c c b f . . . . . . . f c 
        . . c c b b f f . . . . . f f c 
        . . c b b c b f c c . c c f f f 
        . . c b c c b f c c c c c f f f 
        . . . c c c b c b 3 c c 3 c f . 
        . . . c c c c b b 3 c b 3 b c . 
        . . . . c c b b b b b b b b c c 
        . . . c f b b b 1 1 b b b 1 1 c 
        . . c c f b b b b b b b b b b f 
        . . . . f b b b b c b b b c b f 
        . . . . f c b b b 1 f f f 1 f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `],
    100,
    false
    )
    timer.after(700, function () {
        move = 0
        boss1.y = 110
        timer.after(1000, function () {
            projectile2 = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, boss1, -100, 0)
            projectile2.setKind(SpriteKind.Text)
            projectile2.x += -12
            projectile2 = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, boss1, 100, 0)
            projectile2.setKind(SpriteKind.Text)
            projectile2.x += 12
            timer.after(2000, function () {
                boss1.y = 20
                move = 1
            })
        })
    })
})
