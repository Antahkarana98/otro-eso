import { useState } from 'react';

const TagForm = ({setTags, tags}) => {

  const [tagInput, setTagInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      // Agregar la etiqueta a la lista de etiquetas
      setTags([...tags, tagInput.trim()]);

      // Limpiar el input de etiquetas
      setTagInput('');
    }
  };

  const handleDeleteTag = (index) => {
    // Eliminar la etiqueta de la lista de etiquetas
    setTags(tags.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div>
        {/* Input para ingresar etiquetas */}
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Agregar etiquetas apretando Enter"
        />
      </div>
      <div className='grid grid-cols-5 gap-2 mt-5'>
        {/* Mostrar las etiquetas debajo del input */}
        {tags.map((tag, index) => (
          <div key={index} className='my-1'>
            <div className='bg-gray-800 text-white text-sm font-medium px-2.5 py-1 rounded-full flex justify-between w-full'>
              <div>
                {tag}
              </div>
              <div>
                <button
                  onClick={() => {handleDeleteTag(index)}}
                  className='text-white hover:text-red-300'
                  type='button'
                >x</button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TagForm;
