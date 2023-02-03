import axios from "axios";

export const getUser = async (authorId: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${authorId}`);
    return response.data
  } catch (err) {
    throw new Error('User doesn\'t exist');
  }
};

//arg should be always string because function contain operations on string only
export const getInitials = (name: string) => {
  return (name as string).split(" ").map((n)=>n[0]).join("");
} 