#NoEnv

count = 0
Loop, Files, *.png
{
  newName := RegExReplace(A_LoopFileName, "\." . A_LoopFileExt . "$", "")
  ; yield of each regex: 1, 3, 26, 474 = 504
  ; fails on hu_6_4_2_2.png and hu_6_6_2_2.png b/c of '_2_2'
  if % RegExMatch(newName, "_.\d_2$") {
    newName := RegExReplace(newName, "_(1|2)$", "")
    FileMove, %A_LoopFileName%, %newName%.%A_LoopFileExt%
    ++count
  }
}
MsgBox, Done. Converted %count% files.

return