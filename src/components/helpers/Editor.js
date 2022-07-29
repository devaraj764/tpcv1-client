import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function Editor({ value, setValue }) {
    const handleChanges = (e, editor) => {
        const data = editor.getData();
        setValue(data);
    }

    return (
        <div>
            <CKEditor editor={ClassicEditor} data={value} onChange={handleChanges} config={{
                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'numberedList', 'bulletedList',
                    'mediaEmbed'], mediaEmbed: { previewsInData: true }
            }} />
        </div >
    )
}

