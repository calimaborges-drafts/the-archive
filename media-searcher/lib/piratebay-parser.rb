module PirateBayParser
	require 'nokogiri'
	require 'open-uri'
	require 'uri'

	BASE_URL = 'http://www.thepiratebay.se'

	def self.parseSearchDoc(query)
		doc = Nokogiri::HTML(open(URI.encode(BASE_URL + '/search/' + query)))
		links = Array.new
		doc.css('#searchResult tr').each do |tr|
			td = tr.css('td')[1]
			links << td.css('div.detName a')[0]['href'] if (td != nil) 
		end
		return links
	end

	def self.parseDownloadDoc(href)
		doc = Nokogiri::HTML(open(URI.encode(BASE_URL + href, "[]")))
		downloadLink = doc.css('div.download a')[0]
		if downloadLink != nil
			downloadLink['href']
		else
			nil
		end
	end

	def self.search(query, max = 3)
		links = PirateBayParser.parseSearchDoc(query)
		newLinks = Hash.new
		i = 0
		links.each do |link|
			break if i == max
			newLinks[link] = PirateBayParser.parseDownloadDoc(link)
			i = i + 1
		end
		return newLinks
	end
end