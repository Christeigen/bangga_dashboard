import {useState} from 'react'
import { HiX } from 'react-icons/hi'

export default function TagsInput(props) {
    const [tags, setTags] = useState(props.tags);

	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};


    const addTags = (event) => {
        if (event.target.value !== '') {
          // Check if the input is a valid email
          if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(event.target.value)) {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = '';
          }
        }
    };

  return (
    <div className="mb-2 flex items-start flex-wrap min-h-48 w-480 px-2 border rounded-md focus-within:border-black focus-within:border-2">

            <ul id="tags" className="flex flex-wrap p-0 my-2">
            {tags.map((tag, index) => (
                <li
                key={index}
                className="inline-flex items-center justify-center h-32px text-white px-2 rounded-md text-sm bg-slate-200 m-0.5 relative"
                >
                <span className="m-[3px] text-black">{tag}</span>
                <span
                    className="absolute flex items-center justify-center w-4 h-4 text-center text-xs text-black rounded-full bg-white cursor-pointer -top-1.5 -right-1"
                    onClick={() => removeTags(index)}
                >
                    <HiX />
                </span>
                </li>
            ))}
            </ul>
			<input
				type="email"
                className = "flex-1 border-none h-46 text-sm p-3 focus:outline-none focus:border-transparent"
				onKeyDown={event => event.key === "Enter" ? addTags(event) : null}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
			/>
		</div>
  )
}