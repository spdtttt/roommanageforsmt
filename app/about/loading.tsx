import { BeatLoader } from "react-spinners"

const loading = () => {
    return (
        <div className="flex justify-center mt-30">
            <BeatLoader color="#5a5c7e" size={18} />
        </div>
    )
}
export default loading