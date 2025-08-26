namespace SpriteKind {
    export const UI = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -90
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
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
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft))
    face = 0
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
let projectile: Sprite = null
let mySprite: Sprite = null
let face = 0
info.setLife(3)
profilelife.setMaxLife(3)
face = 0
let score = 0
let level = 1
profilelife.setFilledLifeImage(img`
    . . . . . . . . . . . . . 
    . f f f f f . f f f f f . 
    f f 2 2 2 f f f 2 2 2 f f 
    f 2 2 2 2 2 f 2 2 2 2 2 f 
    f 2 2 2 2 2 2 2 1 1 2 2 f 
    f 2 2 2 2 2 2 2 1 1 2 2 f 
    f 2 2 2 2 2 2 2 2 2 2 2 f 
    f f 2 2 2 2 2 2 2 2 2 f f 
    . f f 2 2 2 2 2 2 2 f f . 
    . . f f 2 2 2 2 2 f f . . 
    . . . f f 2 2 2 f f . . . 
    . . . . f f 2 f f . . . . 
    . . . . . f f f . . . . . 
    `)
profilelife.setEmptyLifeImage(img`
    . . . . . . . . . . . . . 
    . f f f f f . f f f f f . 
    f f c c c f f f c c c f f 
    f c c c c c f c c c c c f 
    f c c c c c c c c c c c f 
    f c c c c c c c c c c c f 
    f c c c c c c c c c c c f 
    f f c c c c c c c c c f f 
    . f f c c c c c c c f f . 
    . . f f c c c c c f f . . 
    . . . f f c c c f f . . . 
    . . . . f f c f f . . . . 
    . . . . . f f f . . . . . 
    `)
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
level_count.setPosition(135, 12)
let scoreUi = textsprite.create("score:" + score + "")
scoreUi.setFlag(SpriteFlag.RelativeToCamera, true)
scoreUi.setPosition(80, 12)
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
