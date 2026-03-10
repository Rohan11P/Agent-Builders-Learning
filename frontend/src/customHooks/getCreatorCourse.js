import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import axios from 'axios'
import { setCreatorCourseData } from '../redux/courseSlice'

function getCreatorCourse() {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)
    useEffect(() => {
        const creatorCourse = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/course/getcreator", { withCredentials: true });
                dispatch(setCreatorCourseData(result.data.courses))
            } catch (error) {
                console.log(error);
                dispatch(setCreatorCourseData(null))
            }
        }
        creatorCourse()
    }, [])

    return null
}

export default getCreatorCourse
