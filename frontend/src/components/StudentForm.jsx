export default function StudentForm({ form, setForm, onSubmit, editId }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    // Calculate average when semester fields change
    const semesters = ['semester1','semester2','semester3','semester4','semester5','semester6','semester7','semester8'];
    const total = semesters.reduce((acc, sem) => acc + Number(updatedForm[sem] || 0), 0);
    updatedForm.average = total / semesters.length;

    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="roll" value={form.roll} onChange={handleChange} placeholder="Roll" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Gmail" />
      <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" />

      {[...Array(8)].map((_, i) => (
        <input
          key={i}
          name={`semester${i + 1}`}
          value={form[`semester${i + 1}`]}
          onChange={handleChange}
          placeholder={`Semester ${i + 1}`}
          type="number"
        />
      ))}

      <input value={form.average || 0} readOnly placeholder="Average" />
      <button type="submit">{editId ? 'Update' : 'Add'} Student</button>
    </form>
  );
}
