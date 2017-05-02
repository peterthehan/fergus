#NoEnv

count = 0
Loop, Files, *.png
{
  newName := RegExReplace(A_LoopFileName, "\." . A_LoopFileExt . "$", "")
  ; yield of each regex: 1, 3, 26, 474 = 504
  ; fails on hu_6_4_2_2.png and hu_6_6_2_2.png b/c of '_2_2'
  if % RegExMatch(newName, "muscat_2$") || RegExMatch(newName, "_chocola_vt_2$") || RegExMatch(newName, "npc_\w{1,}\d{0,}_2$") || RegExMatch(newName, "_limited_.*_(1|2)$") || RegExMatch(newName, "_\d_\d{1,2}_2$") {
    if % RegExMatch(newName, "_(1|2)$") {
      newName := RegExReplace(newName, "_(1|2)$", "")
      FileMove, %A_LoopFileName%, %newName%.%A_LoopFileExt%
      ++count
    }
  }
}
MsgBox, Done. Converted %count% files.

return