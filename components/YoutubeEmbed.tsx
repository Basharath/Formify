export default function YoutubeEmbed({ id }: { id: string }) {
  return (
    <div className="rounded-xl overflow-hidden ring-white ring-4">
      <iframe
        // width='853'
        // height='480'
        src={`https://www.youtube.com/embed/${id}?rel=0`} // To disable controls=0
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Copy Text Easily - Intro"
        className="w-[280px] h-[180px] xs:w-[390px] xs:h-[230px] sm:w-[520px] sm:h-[300px] md:w-[720px] md:h-[420px] lg:w-[896px] lg:h-[504px] xl:w-[896px] xl:h-[504px]"
      />
    </div>
  );
}
