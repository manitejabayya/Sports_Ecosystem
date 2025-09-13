const geolib = require('geolib');

class GeoCoder {
  // Calculate distance between two points
  static calculateDistance(point1, point2) {
    if (!point1.latitude || !point1.longitude || !point2.latitude || !point2.longitude) {
      return null;
    }

    return geolib.getDistance(
      { latitude: point1.latitude, longitude: point1.longitude },
      { latitude: point2.latitude, longitude: point2.longitude }
    );
  }

  // Get center point of multiple coordinates
  static getCenterPoint(coordinates) {
    if (!coordinates || coordinates.length === 0) {
      return null;
    }

    const validCoords = coordinates.filter(coord => 
      coord.latitude && coord.longitude
    );

    if (validCoords.length === 0) {
      return null;
    }

    return geolib.getCenterOfBounds(validCoords);
  }

  // Check if point is within radius of center point
  static isWithinRadius(centerPoint, targetPoint, radiusInMeters) {
    if (!centerPoint.latitude || !centerPoint.longitude || 
        !targetPoint.latitude || !targetPoint.longitude) {
      return false;
    }

    const distance = this.calculateDistance(centerPoint, targetPoint);
    return distance <= radiusInMeters;
  }

  // Find nearest points to a given location
  static findNearestPoints(centerPoint, points, limit = 10) {
    if (!centerPoint.latitude || !centerPoint.longitude || !points.length) {
      return [];
    }

    const pointsWithDistance = points
      .map(point => {
        const distance = this.calculateDistance(centerPoint, point);
        return { ...point, distance };
      })
      .filter(point => point.distance !== null)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return pointsWithDistance;
  }

  // Convert city name to coordinates (mock implementation)
  // In production, you would use a real geocoding service
  static async geocodeCity(cityName, stateName = '', countryName = 'India') {
    // Mock coordinates for major Indian cities
    const cityCoordinates = {
      'delhi': { latitude: 28.7041, longitude: 77.1025 },
      'mumbai': { latitude: 19.0760, longitude: 72.8777 },
      'bangalore': { latitude: 12.9716, longitude: 77.5946 },
      'hyderabad': { latitude: 17.3850, longitude: 78.4867 },
      'chennai': { latitude: 13.0827, longitude: 80.2707 },
      'kolkata': { latitude: 22.5726, longitude: 88.3639 },
      'pune': { latitude: 18.5204, longitude: 73.8567 },
      'ahmedabad': { latitude: 23.0225, longitude: 72.5714 },
      'jaipur': { latitude: 26.9124, longitude: 75.7873 },
      'lucknow': { latitude: 26.8467, longitude: 80.9462 }
    };

    const normalizedCity = cityName.toLowerCase().trim();
    
    if (cityCoordinates[normalizedCity]) {
      return {
        latitude: cityCoordinates[normalizedCity].latitude,
        longitude: cityCoordinates[normalizedCity].longitude,
        city: cityName,
        state: stateName,
        country: countryName
      };
    }

    // Return null if city not found
    // In production, make API call to geocoding service
    return null;
  }

  // Reverse geocode coordinates to address
  static async reverseGeocode(latitude, longitude) {
    // Mock implementation - in production use real reverse geocoding
    const mockCities = [
      { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 }
    ];

    const targetPoint = { latitude, longitude };
    const nearest = mockCities
      .map(city => ({
        ...city,
        distance: this.calculateDistance(targetPoint, { latitude: city.lat, longitude: city.lng })
      }))
      .sort((a, b) => a.distance - b.distance)[0];

    if (nearest && nearest.distance < 100000) { // Within 100km
      return {
        city: nearest.name,
        state: 'Unknown',
        country: 'India',
        latitude,
        longitude
      };
    }

    return null;
  }
}

module.exports = GeoCoder;