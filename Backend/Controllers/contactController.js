import Contact from '../models/contact.js'

class ContactController {
    async all(req, res) {
        try {
            const data = await Contact.find({});
            console.log('contacts sent');
            res.send(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).send({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const data = await Contact.create(req.body);
            res.json(data);
            console.log('Contacts created');
        } catch (error) {
            console.error('Error creating contact:', error);
            res.status(500).send({ message: error.message });
        }
    }

    async find(req, res) {
        try {
            const data = await Contact.find({ name: req.params.name });
            if (!data.length) {
                return res.status(404).send({ message: 'Contact not found' });
            }
            console.log('Finding the contact');
            res.send(data);
        } catch (error) {
            console.error(`Error finding contact with name "${req.params.name}":`, error);
            res.status(500).send({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const data = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!data) {
                return res.status(404).send({ message: 'Contact not found' });
            }
            console.log('Contact Updated');
            res.send({ message: 'Contact updated', data });
        } catch (error) {
            console.error(`Error updating contact with ID "${req.params.id}":`, error);
            res.status(500).send({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const data = await Contact.findByIdAndDelete(req.params.id);
            if (!data) {
                return res.status(404).send({ message: 'Contact not found' });
            }
            console.log('Contact deleted');
            res.send({ message: 'Contact deleted' });
        } catch (error) {
            console.error(`Error deleting contact with ID "${req.params.id}":`, error);
            res.status(500).send({ message: error.message });
        }
    }
}

export default new ContactController();
