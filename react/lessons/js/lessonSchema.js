import * as Yup from 'yup';

const lessonSchema = Yup.object().shape({
    title: Yup.string().min(2).max(50).required('Please add a lesson title.'),
    description: Yup.string().min(2).max(500).required('Please add a lesson description.'),
    durationTypeId: Yup.number().min(1).max(50).required('Please select a lesson duration.'),
    imageUrl: Yup.string().min(0).max(150).nullable(true),
    fileUrl: Yup.string().min(2).max(125).required('Please provide a file.'),
    sortOrder: Yup.number().min(1).max(3).required('Please add the order of appearance.'),
});

export default lessonSchema;
