import { Card } from "./Card"

export const RenderCards = ({ data, title, removePost, fetchGallery }) => {
  if (data?.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {data.map((post) => <Card key={post._id} {...post} removePost={removePost} fetchGallery={fetchGallery} />)}
      </div>
    )
  }
  return (<h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title} </h2>)
}