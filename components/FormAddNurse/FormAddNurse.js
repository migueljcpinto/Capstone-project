import useSWR from "swr";

export default function FormAddNurse() {
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
      <input id="name-input" name="name" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
