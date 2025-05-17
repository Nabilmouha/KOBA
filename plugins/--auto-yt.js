import { ytdl } from 'savetubedl';

const handler = async (m, { args, conn }) => {
  const url = args[0];
  const quality = args[1] || '720';

  if (!url) return m.reply('يرجى إدخال رابط الفيديو');

  try {
    const result = await ytdl(url, quality);
    const data = result?.response;

    if (!data?.descarga) throw new Error('فشل الحصول على رابط التحميل');

    // إرسال الصورة المصغرة مع وصف
    await conn.sendMessage(m.chat, {
      image: { url: data.miniatura },
      caption: `🎬 *${data.titulo}*\n📥 الجودة: ${data.calidad}p\n⌛ المدة: ${data.duracion}s\n\nسيتم إرسال الفيديو الآن...`,
    }, { quoted: m });

    // إرسال الفيديو
    await conn.sendMessage(m.chat, {
      video: { url: data.descarga },
      caption: `📽️ تم التحميل بنجاح.`,
    }, { quoted: m });

  } catch (e) {
    return m.reply(`حدث خطأ:\n${e.message}`);
  }
};

handler.command = ['ytmp4'];
export default handler;