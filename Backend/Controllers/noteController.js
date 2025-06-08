import Note from '../models/notes.js';

class NoteController {
    async all(req, res) {
        try {
            const notes = await Note.find({});
            res.send(notes);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const note = await Note.create(req.body);
            res.json(note);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!note) return res.status(404).send({ message: 'Note not found' });
            res.send({ message: 'Note updated', note });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const note = await Note.findByIdAndDelete(req.params.id);
            if (!note) return res.status(404).send({ message: 'Note not found' });
            res.send({ message: 'Note deleted' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async filterByCategory(req, res) {
        try {
            const notes = await Note.find({ category: req.params.category });
            res.send(notes);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default new NoteController();
