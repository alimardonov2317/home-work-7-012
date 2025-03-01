import React, { Component } from 'react'

export default class Hero extends Component {
    constructor() {
        super();
        this.state = {
            fname: "",
            lname: "",
            birthdate: "",
            gender: "male",
            hobby: "",
            students: [],
            editMode: false,
            currentId: null
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.editMode) {
            const updatedStudents = this.state.students.map(student => {
                if (student.id === this.state.currentId) {
                    return {
                        id: student.id,
                        fname: this.state.fname,
                        lname: this.state.lname,
                        birthdate: this.state.birthdate,
                        gender: this.state.gender,
                        hobby: this.state.hobby
                    };
                }
                return student;
            });

            this.setState({
                students: updatedStudents,
                fname: "",
                lname: "",
                birthdate: "",
                gender: "male",
                hobby: "",
                editMode: false,
                currentId: null
            });
        } else {
            const newStudent = {
                id: Date.now(),
                fname: this.state.fname,
                lname: this.state.lname,
                birthdate: this.state.birthdate,
                gender: this.state.gender,
                hobby: this.state.hobby
            };

            this.setState({
                students: [...this.state.students, newStudent],
                fname: "",
                lname: "",
                birthdate: "",
                gender: "male",
                hobby: ""
            });
        }
    }

    handleDelete = (id) => {
        const filteredStudents = this.state.students.filter(student => student.id !== id);
        this.setState({ students: filteredStudents });
    }

    handleEdit = (student) => {
        this.setState({
            fname: student.fname,
            lname: student.lname,
            birthdate: student.birthdate,
            gender: student.gender,
            hobby: student.hobby,
            editMode: true,
            currentId: student.id
        });
    }



    render() {
        return (
            <div className="flex gap-9  min-h-screen">
                <div className="min-h-screen w-full max-w-xs bg-[#111827] p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-left">Create Users</h2>

                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="fname"
                                value={this.state.fname}
                                onChange={this.handleChange}
                                required
                                placeholder="FirstName"
                                className="w-full p-3 rounded bg-[#2a3142] text-white mb-3"
                            />

                            <input
                                type="text"
                                name="lname"
                                value={this.state.lname}
                                onChange={this.handleChange}
                                required
                                placeholder="LastName"
                                className="w-full p-3 rounded bg-[#2a3142] text-white mb-3"
                            />

                            <input
                                type="date"
                                name="birthdate"
                                value={this.state.birthdate}
                                onChange={this.handleChange}
                                required
                                placeholder="Birthdate"
                                className="w-full p-3 rounded bg-[#2a3142] text-white mb-3"
                            />

                            <select
                                name="gender"
                                value={this.state.gender}
                                onChange={this.handleChange}
                                className="w-full p-3 rounded bg-[#2a3142] text-white mb-3"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            <input
                                type="text"
                                name="hobby"
                                value={this.state.hobby}
                                onChange={this.handleChange}
                                required
                                placeholder="Hobby"
                                className="w-full p-3 rounded bg-[#2a3142] text-white mb-3"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded"
                        >
                            {this.state.editMode ? "Update" : "Create"}
                        </button>
                    </form>
                </div>

                <div className="flex flex-wrap gap-4 h-max py-4">
                    {this.state.students.length === 0 ? (
                        <p className="text-gray-400 italic">No users</p>
                    ) : (
                        this.state.students.map(student => (
                            <div key={student.id} className="w-72  bg-[#374151] rounded-lg p-5">
                                <div className="text-left">
                                    <h3 className="text-lg font-bold mb-2">{student.fname} {student.lname}</h3>
                                    <p className="text-gray-200">Birthdate: {student.birthdate}</p>
                                    <p className="text-gray-200">Gender: {student.gender}</p>
                                    <p className="text-gray-200">Hobby: {student.hobby}</p>
                                </div>

                                <div className="flex  gap-2 mt-4">
                                    <button
                                        onClick={() => this.handleDelete(student.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => this.handleEdit(student)}
                                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-4 rounded"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}