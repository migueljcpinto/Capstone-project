import useSWR from "swr";

export default function FormAddNurse({ onSubmit }) {
  const { mutate } = useSWR("/api/nurses"); //check if db has new data - re-validation!

  async function handleSubmit(event) {
    event.preventDefault(); //preventing new loading

    const formData = new FormData(event.target);
    const nurseData = Object.fromEntries(formData); //reading the nurse data

    //calling API
    const response = await fetch(`/api/nurses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(nurseData), //Adding in body the new nurse
    });

    if (response.ok) {
      mutate();
    }

    event.target.reset();
    event.target.elements[0].focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name-input">Enter the name</label>
      <input
        id="name-input"
        name="name"
        type="text"
        placeholder="Enter the name of the nurse"
      />

      <label htmlFor="role-input">Enter your role</label>
      <select id="role-input">
        <option value=""> </option>
        <option value="chief">Chief</option>
        <option value="sub-chief">Sub-chief</option>
        <option value="teacher">Teacher</option>
        <option value="nurse">Nurse</option>
        <option value="student">Student</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
