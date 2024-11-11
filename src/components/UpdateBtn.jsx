import Link from "next/link"
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

const UpdateBtn = ({id}) => {
  return (
    <div>
        <Link title="Update the fields"  href={`/editTopic/${id}`}><HiPencilAlt size={24}/></Link>
    </div>
  )
}

export default UpdateBtn
