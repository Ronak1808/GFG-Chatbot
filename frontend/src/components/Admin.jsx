import axios from 'axios';
import exportFromJSON from 'export-from-json';
import logo from '../assets/profile.png';
function Admin() {

    const handleClick = async () => {
        try {
            const response = await axios.get('http://localhost:3000/downloadcsv');
            if (response.data) {
                console.log(response.data);
                const fileName= "Chat-Transcript";
                const exportType=exportFromJSON.types.csv;
                exportFromJSON({data: response.data.messages, fileName, exportType});
            } else {
                alert("CSV data is empty");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleClick2 = async () => {
        try {
            const response = await axios.get('http://localhost:3000/unans');
            if (response.data) {
                console.log(response.data);
                const fileName= "Unanswered-queries";
                const exportType=exportFromJSON.types.csv;
                exportFromJSON({data: response.data.messages, fileName, exportType});
            } else {
                alert("CSV data is empty");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-[700px]'>
            <div className="bg-black p-9 w-60 rounded-lg shadow-lg text-white">
                <div className="flex flex-col items-center">
                    <img
                    src={logo} // Assuming profile picture URL is provided in user data
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full mb-4"
                    />
                    <div className="text-lg font-semibold mb-2">Admin Account</div>
                    <div className="text-gray-500 mb-2 text-white ">admin@gmail.com</div>
                </div>
            </div>
            <button onClick={handleClick} className='mt-4 bg-black w-60 text-white p-3 hover:bg-gray-800'>Download Chat transcript</button>
            <button onClick={handleClick2} className='mt-4 bg-black w-60 text-white p-3 hover:bg-gray-800'>Get Unanswered Queries</button>
        </div>
    );
}

export default Admin;
