import Contact from '../models/contact.js'

class ContactController {
    async all(req, res) {
        try {
            const data = await Contact.find({});
            res.send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const data = await Contact.create(req.body);
            res.json(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async find(req, res) {
        try {
            const data = await Contact.find({ name: req.params.name });
            if (!data.length) return res.status(404).send({ message: 'Contact not found' });
            res.send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const data = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!data) return res.status(404).send({ message: 'Contact not found' });
            res.send({ message: 'Contact updated', data });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const data = await Contact.findByIdAndDelete(req.params.id);
            if (!data) return res.status(404).send({ message: 'Contact not found' });
            res.send({ message: 'Contact deleted' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default new ContactController();
