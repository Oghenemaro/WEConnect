import db from '../models/index';

const dbLocation = db.locations;

class Locations {
  static addNewLocation(req, res) {
    const { state } = req.body;
    if (!state) {
      return res.status(400).send({ Status: 'Failed', Message: 'A location was not entered, enter a new location' });
    }
    return dbLocation
      .create({
        state
      })
      .then(() => res.status(200).send({ Status: 'Successful', Message: 'New Location added' }))
      .catch(() => res.status(400).send({ Status: 'Failed', Message: 'Failed to create new location' }));
  }
  static getAllLocations(req, res) {
    dbLocation.findAll()
      .then(locations => res.status(200).send({ Status: 'Successful', Message: locations }))
      .catch(() => res.status(400).send({ Status: 'Failed', Message: 'Failed to retrieve locations' }));
  }
}

export default Locations;
