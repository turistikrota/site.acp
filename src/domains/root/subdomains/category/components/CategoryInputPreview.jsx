import { useTranslation } from "react-i18next"
import { Col, Row } from "reactstrap"

const CategoryInputPreview = ({
    inputGroups,
    inputs,
}) => {
    const { i18n } = useTranslation('categories')
    
    const mapGroups = () => {
        const groups = {}
        for (const group of inputGroups) {
            groups[group.id] = []
        }
        for (const input of inputs) {
            groups[input.groupId].push(input)
        }
        return groups
    }

    const groups = mapGroups()

    return <>
        {inputGroups.map((group, index) => <Row key={index}>
        <Col
            xs={12}
        > group </Col>
        {groups[group.id].map((input, index) => <Col 
        xs={6}
        key={index}>
            input
        </Col>)}
        </Row>)}
    </>
}

export default CategoryInputPreview