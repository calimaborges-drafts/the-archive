module ObjectToFile
	def save_object_to_file(object, file_path)
		File.open(file_path, 'w') do |file|
			Marshal.dump(object, file)
		end
	end

	def load_object_from_file(file_path)
		return nil if not File.exists?(file_path)
		File.open(file_path) do |file|
			Marshal.load(file)
		end
	end
end