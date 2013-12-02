/*
 * 高斯模糊滤镜
 */

define( function ( require, exports, module ) {

    var GaussianblurEffect = require( "filter/effect/gaussianblureffect" ),
        Effect = require( "filter/effect/effect" ),
        ColorMatrixEffect = require( "filter/effect/colormatrixeffect" ),
        Color = require( "graphic/color" ),
        Utils = require( "core/utils" ),
        CompositeEffect = require( "filter/effect/compositeeffect" ),
        OffsetEffect = require( "filter/effect/offseteffect" );

    // 计算给定颜色矩阵数组应用透明度更改后的新矩阵数组
    function calculateAlpha ( colorMatrix, opacity ) {

        colorMatrix = colorMatrix.slice( 0 );

        if ( opacity < 1 ) {
            colorMatrix[ 18 ] *= opacity;
        }

        return colorMatrix;

    }

    return require( "core/class" ).createClass( 'ProjectionFilter', {

        base: require( "filter/filter" ),

        constructor: function ( stdDeviation, dx, dy ) {

            this.callBase();

            this.gaussianblurEffect = new GaussianblurEffect( stdDeviation, Effect.INPUT_SOURCE_ALPHA );
            this.gaussianblurEffect.set( 'result', 'gaussianblur' );
            this.addEffect( this.gaussianblurEffect );

            this.offsetEffect = new OffsetEffect( dx, dy, this.gaussianblurEffect );
            this.offsetEffect.set( 'result', 'offsetBlur' );
            this.addEffect( this.offsetEffect );

            this.colorMatrixEffect = new ColorMatrixEffect( ColorMatrixEffect.TYPE_MATRIX, this.offsetEffect );
            this.colorMatrixEffect.set( 'values', ColorMatrixEffect.MATRIX_ORIGINAL );
            this.colorMatrixEffect.set( 'result', 'colorOffsetBlur' );
            this.addEffect( this.colorMatrixEffect );

            this.compositeEffect = new CompositeEffect( CompositeEffect.OPERATOR_OVER, Effect.INPUT_SOURCE_GRAPHIC, this.colorMatrixEffect );
            this.addEffect( this.compositeEffect );

        },

        // 设置投影颜色
        setColor: function ( color ) {

            var matrix = null,
                originMatrix = null,
                colorValue = [];

            if ( Utils.isString( color ) ) {

                color = Color.parse( color );

            }

            if ( !color ) {
                return this;
            }

            matrix = ColorMatrixEffect.MATRIX_EMPTY.split( " " );
            originMatrix = calculateAlpha( this.colorMatrixEffect.get( 'values' ).split( " " ), color.get( 'a' ) );

            // alpha通道更改
            matrix[ 18 ] = originMatrix[ 18 ];

            colorValue.push( color.get( 'r' ) );
            colorValue.push( color.get( 'g' ) );
            colorValue.push( color.get( 'b' ) );

            // rgb 颜色更改
            for ( var i = 0, len = colorValue.length; i < len; i++ ) {

                matrix[ i * 5 + 3 ] = colorValue[ i ] / 255;

            }

            this.colorMatrixEffect.set( 'values', matrix.join( " " ) );

            return this;

        },

        // 设置投影透明度
        setOpacity: function ( opacity ) {

            var matrix = this.colorMatrixEffect.get( 'values' ).split( " " );

            matrix = calculateAlpha( matrix, opacity );

            this.colorMatrixEffect.set( 'values', matrix.join( " " ) );

            return this;

        },
        
        // 设置阴影偏移量
        setOffset: function ( dx, dy ) {

            this.setOffsetX( dx );
            this.setOffsetY( dy );

        },

        setOffsetX: function ( dx ) {

            this.offsetEffect.set( 'dx', dx );

        },

        setOffsetY: function ( dy ) {

            this.offsetEffect.set( 'dy', dy );

        },

        setDeviation: function ( deviation ) {

            this.gaussianblurEffect.set( 'stdDeviation', deviation );

        }

    } );

} );