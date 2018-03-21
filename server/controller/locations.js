import db from '../models/index';

const dbLocation = db.locations;

class Locations {
  static addNewLocation(req, res) {
    const { location } = req.body;
    if (!location) {
      return res.status(400).send({ Status: 'Failed', Message: 'A location was not entered, enter a new location' });
    }
    return dbLocation
      .create({
        location
      })
      .then(() => res.status(200).send({ Status: 'Successful', Message: 'New Location added' }))
      .catch(() => res.status(400));
  }
  static getAllLocations(req, res) {
    return res.status(200).send({ Status: 'Successful', Locations: dbLocation });
  }
}

export default Locations;
