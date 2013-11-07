/**
 * Created by hn on 13-11-7.
 */

define( function ( require, exports, module ) {

    //矩形

    var Paper = require( "graphic/paper" ),
        Rect = require( "graphic/rect"),
        Pen = require( "graphic/pen" ),
        Line = require( "graphic/line"),
        Color = require( "graphic/color" ),
        Ellipse = require( "graphic/ellipse" ),
        Circle = require( "graphic/circle" ),
        Polyline = require( "graphic/polyline" );

//    var paper = new Paper( document.body ),
//        rect = new Rect( 0, 0, 100, 50 );
//
//    paper.addChild( rect );
//    rect.setWidth( 500 );
//    rect.setHeight( 100 );
//    rect.setRadius( 5 );
//
//    window.setTimeout( function () {
//
//        rect.setSize( 50, 20 );
//        rect.setPosition( 100, 100 );
//        rect.setRadius( 0 );
//
//    }, 1000 );

    //直线
//    var paper = new Paper( document.body ),
//        line = new Line( 10, 10, 200, 200 );
//
//    paper.addChild( line );

    //折线
//    var paper = new Paper( document.body ),
//        polyline = new Polyline();
//
//    polyline.addChild( { x: 10, y: 20 } );
////
////    debugger;
//
//    paper.addChild( polyline );

    //pen测试
//    var paper = new Paper( document.body ),
//        pen = new Pen(),
//        color = new Color( "rgba( 3, 4, 5, 0.5 )" ),
//        line = new Line( 10, 10, 50, 50 );
//
//    pen.setColor( color );
//
//    line.stroke( pen );
//    paper.addChild( line );
//
//    window.setTimeout( function () {
//
//        pen.setColor( Color.parse( "#ff0000" ) );
//        pen.setLinecap( 'round' );
//        pen.setLinejoin( 'round' );
//        pen.setDashArray( [ 5, 3 ] );
//        pen.setOpacity( 1 );
//        line.stroke( pen );
//
//    }, 1000 );

    //ellipse测试
//    var paper = new Paper( document.body ),
//        ellipse = new Ellipse( 50, 50, 20, 20 );
//
//    paper.addChild( ellipse );

    //circle测试
//    var paper = new Paper( document.body ),
//        circle = new Circle( 50, 50, 20 );
//
//    paper.appendChild( circle );


} );