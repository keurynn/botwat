const { spawn, exec } = require('child_process')
const katakotor = require('../database/kotor.json');

var maintan = `Maaf botnya lagi sedang perbaikan, mohon tunggu sehari atau 2 hari.
tetapi jika anda mau donasi.
hubungi ownernya
wa.me/6282237416678
untuk semangatin :)
mau 1k,2k,3k,4k,5k,10k,15k,20k,25k,30k,35k,40k,45k,50k,55k,60k,65k,70k,75k,80l,85k,90k,95,100k..999juta saya terima semua :'),
tetapi sebelum donasi hubungi ownernya dulu. makasih`

var jagaOmongan = `Maaf gans jaga omongan -_-`;
var grub = "Perintah ini hanya bisa di gunakan dalam group";
var blocked = "Hey hey orang yang sudah di blok tidak bisa gunakan bot";
var grubAdmin = "Perintah ini hanya bisa di gunakan oleh admin group";
var botGrubAdmin = "Perintah ini hanya bisa di gunakan ketika bot menjadi admin";
var owner = "Perintah ini hanya untuk Owner bot!";
var ownerGrub = "Perintah ini hanya bisa di gunakan oleh Owner group";

const cek = async () => {
  try {
    var maint = await fs.readFileSync('lib/maintence', 'utf-8');
    if (maint === 'hidup') { return true } else { return false }
  } catch (e) {
    exec(`echo "hidup">lib/maintence`);
    cek()
  };
};

function kotor(ktanya) {
  try { b = ktanya.split(' ') } catch (err) { b = ktanya };
  for (i = 0, len = b.length; i < len; i++) {
    if (katakotor.kata.indexOf(b[i]) > -1) return true
  }
};



const blockCek = async (kata, jenis, message) => {
  if (await kotor(kata)) return maintan;
  if (await cek()) return jagaOmongan;

  if (jenis) {
    const { isGroubMsg, isBlocked, isGroupAdmins, isOwner, isBotGroupAdmins, isGroupOwner, message } = jenis;
    const { type, id, from, t, sender, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

    if (message) {
      const isGroupAdminss = isGroupMsg ? groupAdmins.includes(sender.id) : false;
      const isBotGroupAdminss = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;
      const isOwnerr = ownerNumber.includes(sender.id);
      const isBlockedd = blockNumber.indexOf(sender.id) === -1;
      const isGroupOwnerr = sender.id === chat.groupMetadata.owner;
      const isGroupMsgg = message.isGroupMsg;


      if (isBlocked && !isBlockedd) return blocked;
      if (isOwner && !isOwnerr) return owner;
      if (isGroubMsg && isGroupMsgg) return grub;
      if (isGroupAdmins && isGroupAdminss || isOwnerr) return grubAdmin;
      if (isBotGroupAdmins && isBotGroupAdminss) return botGrubAdmin;
      if (isGroupOwner && isGroupOwnerr) return ownerGrub;
    }
  };

  return false;

};

module.exports = {
  blockCek,
  cek,
  kotor
}