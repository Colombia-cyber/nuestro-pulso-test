// ...earlier code...
<div className="flex justify-between text-sm mb-1">
  <span className="text-green-700 font-medium">✅ A favor de la reforma</span>
  <span>
    {debates?.[0]?.sides?.favor?.percentage ?? "N/A"}%
  </span>
</div>
// ...later code...