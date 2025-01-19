import { fetchDepartments } from "@/app/(client)/lib/data";
import Select from "react-select";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]

export const getStaticProps = async () => {
    console.log('jopa')
    const data = await fetchDepartments()
    console.log(data, 666)
    return {
        props: {
            data
        }
    }
}


export default function Departments_select({ data }: any) {
    console.log(data, 123)
    return <>
        <p>123123123</p>
        {/* <Select options={options} /> */}
    </>
}

