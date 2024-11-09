import axios from 'axios';

const boardData = async (page) => {
  try {
    const response = await axios.get(`http://localhost/api/get_board.php?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default boardData;