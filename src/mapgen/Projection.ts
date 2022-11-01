import { toInteger, toNumber } from "lodash";
import { WORLD_SIZE } from "./WorldSize";

const M_PI = Math.PI;

export default class Projection {
  public static degreesToPixels(latlng: {
    lat: number,
    lng: number
  }, size: {
    width: number,
    height: number
  } = WORLD_SIZE): {
    x: number,
    y: number
  } {
    const lat = toNumber( latlng.lat );
    const lng = toNumber( latlng.lng );
    const width = toInteger( size.width );
    const height = toInteger( size.height );

    if ( lat < -90 || lat > 90 ) {
      throw new Error( 'Latitude out of range (valid range: ±90°)' );
    }

    if ( lng < -180 || lng > 180 ) {
      throw new Error( 'Longitude out of range (valid range: ±180°)' );
    }

    if ( width <= 0 ) {
      throw new Error( 'Width must be greater than 0' );
    }

    if ( height <= 0 ) {
      throw new Error( 'Height must be greater than 0' );
    }

    return {
      'x': (lng+180)*(width/360),
      'y': (height/2)-(width*Math.log(Math.tan((M_PI/4)+((lat*M_PI/180)/2)))/(2*M_PI))
    };
  }

  /**
   * @param pixelX
   * @param pixelY
   * @param width
   * @param height
   * @return array
   * @throws \Error
   */
  public static pixelsToDegrees(pixel: {
    x: number,
    y: number
  }, size: {
    width: number,
    height: number
  } = WORLD_SIZE): {
    lat: number,
    lng: number
  } {
    const pixelX = toInteger( pixel.x );
    const pixelY = toInteger( pixel.y );
    const width = toInteger( size.width );
    const height = toInteger( size.height );

    if ( width <= 0 ) {
      throw new Error( 'Width must be greater than 0' );
    }

    if ( height <= 0 ) {
      throw new Error( 'Height must be greater than 0' );
    }

    // if ( pixelX < width ) {
    //   throw new Error( 'Pixel X must be on the map image' );
    // }

    // if ( pixelY < height ) {
    //   throw new Error( 'Pixel Y must be on the map image' );
    // }

    return {
      // 'lat': (Math.exp(-(pixelY-(height/2))/width*(2*M_PI))-Math.tan((M_PI/4))*2)/(M_PI/180),
      lat: ((Math.atan(Math.exp((((height / 2) -pixelY) / width) * (2 * Math.PI))) - (Math.PI / 4))*2)/(Math.PI/180),
      'lng': (pixelX-(width/2))/(width/360)
    };
  }
}