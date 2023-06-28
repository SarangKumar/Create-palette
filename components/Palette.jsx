'use client';
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsCheckLg } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import copy from "copy-to-clipboard";

const Palette = ({ colors, id, length = 0, likes = 0, name }) => {
	return (
		<div className="w-[300px]">
			<ul className="flex h-[90px] items-center rounded-lg overflow-hidden border border-gray-200 color_transition">
				{colors.map((color, i) => (
					<Color
						color={color}
						key={i}
					/>
				))}
			</ul>

			<div className="text-gray-500 gap-x-3 mt-2 text-sm font-medium px-2 flex justify-between items-center">
				<p className="text-sm ">{name}</p>
				<div className="items-center flex gap-x-2">
					<div className="flex">
						<p>{likes}</p>
						<button>
							<AiOutlineHeart
								size={16}
								className="mt-[2px]"
							/>
						</button>
					</div>

					<button>
						<BsThreeDots size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Palette;

const Color = ({ color }) => {
	const [copied, setCopied] = useState(false);
	const handleCopy = (color) => {
		copy(color);
		setCopied(true);
		setTimeout(() => setCopied(false), 3000);
	};
	return (
		<li
			key={color}
			onClick={() => handleCopy(color)}
			style={{ backgroundColor: color }}
			className="cursor-pointer flex justify-center items-center h-full grow text-transparent hover:text-black basis-auto transition-growing color_transition"
		>
			{copied ? <BsCheckLg /> : <BiCopy />}
		</li>
	);
};
