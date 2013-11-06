define(function(require, exports, module) {

    var HANDLER_CACHE = {},
        LISTENER_CACHE = {};
        ShapeEvent = require( "graphic/shapeevent" ),
        Utils = require( "core/utils" );

    function listen ( obj, type, handler ) {

        var handlerList = null;

        if ( !HANDLER_CACHE[ this._EventListenerId ] ) {
            HANDLER_CACHE[ this._EventListenerId ] = {};
        }

        if ( !HANDLER_CACHE[ this._EventListenerId ][ type ] ) {

            HANDLER_CACHE[ this._EventListenerId ][ type ] = [];

            //监听器
            LISTENER_CACHE[ this._EventListenerId ] = function ( e ) {

                e = new ShapeEvent( e || window.event );

                Utils.each( HANDLER_CACHE[ this._EventListenerId ][ type ], function ( fn, index ) {

                    return fn.call( obj, e );

                } );


            };

            //绑定事件
            bindEvent( obj, type, LISTENER_CACHE[ this._EventListenerId ] );

        }

        handlerList = HANDLER_CACHE[ this._EventListenerId ][ type ];

        handlerList.push( handler );

        return handlerList.length - 1;

    }

    function bindEvent ( obj, type, handler ) {

        if ( obj.addEventListener ) {

            obj.addEventListener( type, handler, false );

        } else {

            obj.attachEvent( "on" + type, handler );

        }

    }

    function deleteEvent ( obj, type, handler ) {

        if ( obj.removeEventListener ) {

            obj.removeEventListener( type, handler, false );

        } else {

            obj.detachEvent( type, handler );

        }

    }
    
    return require('core/class').createClass( 'EventHandler', {

        constructor: function() {

            //当前对象的事件处理器ID
            this._EventListenerId = + new Date();

        },

        addEventListener: function ( type, handler ) {

            var record = {};

            if ( typeof type === 'string' ) {
                type = type.replace( /^\s+|\s+$/g, '' ).split( /\s+/ );
            }

            Utils.each( type, function ( currentType ) {

                record[ currentType ] = listen( this, currentType, handler );

            } );

            return record;

        },

        removeEventListener: function ( type, handler ) {

            try {

                var hanlderList = HANDLER_CACHE[ this._EventListenerId ][ type ];

                //移除指定索引的监听器
                if ( typeof handler === 'number' ) {

                    handler = Math.floor( handler );
                    delete hanlderList[ handler ];

                //移除指定的监听器
                } else if ( typeof handler === 'function' ) {

                    Utils.each( hanlderList, function ( fn, index ) {

                        if ( fn === handler ) {
                            delete hanlderList[ index ];
                            return false;
                        }

                    } );

                //删除所有监听器
                } else if ( handler === undefined ) {

                    HANDLER_CACHE[ this._EventListenerId ][ type ] = [];

                    deleteEvent( this, type, LISTENER_CACHE[ this._EventListenerId ] );

                }

            } catch ( e ) {
                //do nothing
            }

        },

        on: function () {
            this.addEventListener.apply( this, arguments );
        },

        off: function () {
            this.removeEventListener.apply( this, arguments );
        }

    });

});