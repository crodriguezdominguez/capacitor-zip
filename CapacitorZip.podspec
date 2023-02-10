
  Pod::Spec.new do |s|
    s.name = 'CapacitorZip'
    s.version = '1.0.5'
    s.summary = 'Zip plugin'
    s.license = 'MIT'
    s.homepage = 'https://github.com/match08/capacitor-zip'
    s.author = 'Osei Fortune'
    s.source = { :git => 'https://github.com/match08/capacitor-zip', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
    s.dependency 'SSZipArchive'
  end
