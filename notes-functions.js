'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (error) {
        return []
    }
}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const titleEl = document.createElement('h3')
    const dateCreatedEl = document.createElement('h3')
    const dateUpdateddEl = document.createElement('h3')
    const bodyEl = document.createElement('p')

    noteEl.classList.add('noteLink')
    noteEl.setAttribute('href', `/edit.html#${note.id}`)

    // Setup the note title text
    if (note.title.length > 0 && note.title.length < 30) {
        titleEl.textContent = note.title
    } else if (note.title.length >= 30) {
        titleEl.textContent = `${note.title.substr(0, 30)}...`
    } else {
        titleEl.textContent = 'Unnamed note'
    }
    titleEl.classList.add('individual-note-title')
    noteEl.appendChild(titleEl)

    // Setup dates
    dateCreatedEl.textContent = `Created: ${note.createdAt}`
    dateCreatedEl.classList.add('individual-note-dates')
    noteEl.appendChild(dateCreatedEl)

    dateUpdateddEl.textContent = `Updated: ${note.updatedAt}`
    dateUpdateddEl.classList.add('individual-note-dates')
    noteEl.appendChild(dateUpdateddEl)

    // Setup note body text
    if (note.body.length > 0 && note.body.length < 60) {
        bodyEl.textContent = note.body
    } else if (note.body.length >= 60) {
        bodyEl.textContent = `${note.body.substr(0, 60)}...`
    } else {
        bodyEl.textContent = 'Empty note'
    }
    bodyEl.classList.add('individual-note-body')
    noteEl.appendChild(bodyEl)

    return noteEl
}

// Sort your notes by one of two ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''
    document.querySelector('.number-of-notes').innerHTML = ''

    filteredNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })

    document.querySelector('.number-of-notes').textContent = `(${notes.length})`
}

// Generate the last edited message
const generateLastEdited = (time) => `Last edited: ${moment(time).format('L')}`